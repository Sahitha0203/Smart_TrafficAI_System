import React, { useState } from "react";
import { Upload } from "lucide-react";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
    }
  };

  // Trigger file input when clicking the upload box
  const handleBoxClick = () => {
    document.getElementById("fileInput").click();
  };

  // Handle submit (you can later integrate this with your FastAPI endpoint)
  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    // TODO: Replace with your YOLOv8 backend upload logic
    console.log("Uploading file:", selectedFile.name);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Upload Card */}
        <div className="bg-white shadow-md border rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Select File
          </h2>
          <p className="text-gray-600 mb-8">
            Upload a video for YOLOv8 congestion detection.
          </p>

          {/* Upload Area */}
          <div
            onClick={handleBoxClick}
            className="border-2 border-dashed border-gray-300 rounded-2xl py-20 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition"
          >
            <Upload className="w-10 h-10 text-blue-500 mb-3" />
            <p className="text-gray-700 font-medium">
              Click to upload or drag and drop
            </p>
            <p className="text-gray-500 text-sm mt-1">
              MP4, AVI, PNG, JPG (MAX. 50MB)
            </p>
          </div>

          {/* Hidden File Input */}
          <input
            id="fileInput"
            type="file"
            accept="video/*,image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* File Name Display */}
          {selectedFile && (
            <p className="mt-4 text-gray-700 font-medium">
              ✅ Selected: {selectedFile.name}
            </p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-8 bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            Process with YOLOv8
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
