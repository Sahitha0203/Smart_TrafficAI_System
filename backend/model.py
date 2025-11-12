# model.py

from collections import deque, Counter
from datetime import datetime
import cv2
import boto3
from ultralytics import YOLO
import logging
import os

# ✅ Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")


class CongestionMonitor:
    def __init__(self, model_path, video_source, conf_threshold=0.5, interval_sec=5, smooth_window=6):
        self.model_path = model_path
        self.video_source = video_source
        self.conf_threshold = conf_threshold
        self.interval_sec = interval_sec
        self.smooth_window = smooth_window

        # ✅ Initialize CloudWatch client (IAM Role must have CloudWatchFullAccess or similar)
        self.cloudwatch = boto3.client('cloudwatch', region_name='ap-south-1')

        self.vehicle_classes = ["car", "truck", "bus", "motorcycle"]
        self.high_thres = 10
        self.moderate_thres = 5

        self.status_history = deque(maxlen=smooth_window)
        self.avg_count_history = deque(maxlen=smooth_window)

        self.current_congestion = "LOADING"
        self.current_trend = "STABLE"
        self.current_avg_count = 0
        self.last_update_time = datetime.utcnow().isoformat()

        try:
            # ✅ Ensure model and video exist
            if not os.path.exists(self.model_path):
                raise FileNotFoundError(f"Model not found: {self.model_path}")
            if not os.path.exists(self.video_source):
                raise FileNotFoundError(f"Video not found: {self.video_source}")

            # ✅ Initialize YOLO model and video source
            self.model = YOLO(self.model_path)
            self.cap = cv2.VideoCapture(self.video_source)
            if not self.cap.isOpened():
                raise IOError(f"Could not open video source: {self.video_source}")

            fps = self.cap.get(cv2.CAP_PROP_FPS) or 30
            self.frames_per_interval = max(1, int(self.interval_sec * fps))

            logging.info(f"✅ Monitor initialized | FPS: {fps:.2f} | Frames per interval: {self.frames_per_interval}")

        except Exception as e:
            logging.error(f"❌ Error during CongestionMonitor initialization: {e}")
            self.current_congestion = "ERROR"
            self.model = None
            self.cap = None

    def detect_once(self):
        """Run detection once for one interval (called repeatedly by FastAPI background task)."""
        if self.current_congestion == "ERROR" or self.model is None or self.cap is None:
            logging.warning("⚠️ Skipping detection due to initialization error.")
            return

        interval_counts = []

        try:
            for _ in range(self.frames_per_interval):
                ret, frame = self.cap.read()
                if not ret:
                    # ✅ Restart video when it ends
                    logging.info("🔁 Restarting video...")
                    self.cap.release()
                    self.cap = cv2.VideoCapture(self.video_source)
                    continue

                # Run YOLO detection silently
                results = self.model(frame, verbose=False)
                count = 0
                for box in results[0].boxes:
                    label = results[0].names[int(box.cls[0])]
                    prob = float(box.conf[0])
                    if label in self.vehicle_classes and prob >= self.conf_threshold:
                        count += 1
                interval_counts.append(count)

            if not interval_counts:
                logging.warning("⚠️ No frames processed in this interval.")
                return

            avg_count = round(sum(interval_counts) / len(interval_counts))
            self.current_avg_count = avg_count

            # Determine congestion level
            if avg_count >= self.high_thres:
                interval_status = "HIGH"
            elif avg_count >= self.moderate_thres:
                interval_status = "MODERATE"
            else:
                interval_status = "LOW"

            self.status_history.append(interval_status)
            self.avg_count_history.append(avg_count)

            # Determine trend
            if len(self.avg_count_history) >= 3:
                a, b, c = list(self.avg_count_history)[-3:]
                if a < b < c:
                    self.current_trend = "INCREASING"
                elif a > b > c:
                    self.current_trend = "DECREASING"
                else:
                    self.current_trend = "STABLE"

            # Determine dominant congestion status
            most_common = Counter(self.status_history).most_common(1)[0][0]
            self.current_congestion = most_common
            self.last_update_time = datetime.utcnow().isoformat()

            logging.info(
                f"✅ Detection: {self.current_congestion} | Avg: {self.current_avg_count} | Trend: {self.current_trend}"
            )

            # ✅ Push metrics to CloudWatch
            congestion_value = {
                "LOW": 20,
                "MODERATE": 60,
                "HIGH": 90
            }.get(self.current_congestion, 0)

            logging.info(f"🧠 Preparing to push metrics: Congestion={congestion_value}, Vehicles={self.current_avg_count}")

            try:
                response = self.cloudwatch.put_metric_data(
                    Namespace='TrafficAI',
                    MetricData=[
                        {
                            'MetricName': 'CongestionLevel',
                            'Unit': 'Percent',
                            'Value': congestion_value
                        },
                        {
                            'MetricName': 'VehicleCount',
                            'Unit': 'Count',
                            'Value': self.current_avg_count
                        }
                    ]
                )
                logging.info(f"📤 Metrics pushed successfully to CloudWatch! Response: {response}")
            except Exception as cw_error:
                logging.error(f"❌ Failed to push metrics to CloudWatch: {cw_error}")

        except Exception as e:
            logging.error(f"❌ Error during detection: {e}")
            self.current_congestion = "ERROR_RUNTIME"
            self.last_update_time = datetime.utcnow().isoformat()

    def get_latest_status(self):
        """Return the most recent traffic status for API endpoint /status."""
        return {
            "congestion": self.current_congestion,
            "trend": self.current_trend,
            "timestamp": self.last_update_time,
            "avg_count": self.current_avg_count,
            "window_history": list(self.status_history),
        }
