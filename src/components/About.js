import React from "react";
import { Brain, Camera, Zap, BarChart3 } from "lucide-react";

const About = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50 text-center min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title Section */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          About Traffic AI System
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Leveraging cutting-edge YOLOv8 machine learning technology to
          revolutionize traffic management and congestion detection in smart
          cities.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 text-left flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Brain className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                YOLOv8 AI Model
              </h3>
              <p className="text-gray-600 text-sm">
                State-of-the-art object detection model for real-time traffic
                analysis and vehicle counting.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 text-left flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Camera className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-time Detection
              </h3>
              <p className="text-gray-600 text-sm">
                Process traffic images and videos instantly to detect congestion
                levels and vehicle patterns.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 text-left flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Zap className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast Processing
              </h3>
              <p className="text-gray-600 text-sm">
                Lightning-fast inference speeds ensure minimal latency in
                traffic monitoring systems.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 text-left flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <BarChart3 className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Data Analytics
              </h3>
              <p className="text-gray-600 text-sm">
                Comprehensive analytics dashboard to visualize traffic trends
                and congestion patterns over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
