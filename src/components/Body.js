import { Link } from "react-router-dom";

const Body = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#eaf3ff] via-[#f7faff] to-white pt-24">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
          AI-Powered Traffic{" "}
          <span className="text-blue-600">Congestion Detection</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Modernize cities by transforming signalized intersections into a
          connected digital transportation network that enhances efficiency,
          assures safety, and maximizes infrastructure utilization.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/dashboard"
            className="px-6 py-3 text-base font-semibold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Subtle fades */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Body;
