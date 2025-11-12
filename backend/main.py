# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import asyncio
from model import CongestionMonitor
import logging

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Paths must be relative to EC2 backend directory
congestion_monitor = CongestionMonitor(
    model_path="./yolov8n.pt",
    video_source="./uploaded_videos/1721294-hd_1920_1080_25fps.mp4",
    conf_threshold=0.5,
    interval_sec=5,
    smooth_window=6,
)


async def detection_loop():
    """Background loop to run YOLO detection continuously."""
    while True:
        congestion_monitor.detect_once()
        await asyncio.sleep(5)  # Adjusted to your update rate


@app.on_event("startup")
async def startup_event():
    """Start background detection loop."""
    asyncio.create_task(detection_loop())
    logging.info("🚀 Background detection loop started!")


@app.get("/status")
def get_status():
    """Expose latest traffic status for frontend."""
    return JSONResponse(content=congestion_monitor.get_latest_status())


@app.get("/")
def home():
    """Root route for quick health check."""
    return {"message": "🚦 Traffic AI Backend is running!"}
