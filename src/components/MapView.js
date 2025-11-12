import React from "react";
import { MapPin } from "lucide-react";

const MapView = () => {
  return (
    <div className="pt-20  min-h-screen flex flex-col">
      {/* Title + Info Section */}
      <div className="px-8 py-4 bg-white shadow-sm z-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Traffic Map View
        </h1>
      </div>

      {/* Full Page Map Placeholder */}
      <div className="flex-1 bg-blue-50 border-t border-blue-100 flex flex-col items-center justify-center rounded-3xl m-10">
        <MapPin className="w-10 h-10 text-blue-400 mb-3" />
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          Map Integration Coming Soon
        </h3>
        <p className="text-gray-500 text-center max-w-lg">
          This section will display a fully interactive map showing real-time
          traffic congestion data at various intersections and roadways.
        </p>
      </div>
    </div>
  );
};

export default MapView;
