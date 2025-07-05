import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp"

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-5 lg:px-20">
      <div className="container flex flex-col-reverse lg:flex-row items-center bg-blue-200 rounded-3xl">
        {/* Left Content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Comfort and Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Style That Fits Into Your Daily Life
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Experience high-quality, comfortable apparel that seamlessly blends
            fashion and function — crafted to help you look sharp and feel
            confident every single day.
          </p>
          <Link
            to="/collections/all"
            className="bg-slate-800 text-white px-6 py-3 rounded-lg text-lg hover:bg-slate-700"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2">
            <img src={featured} alt="Featured Collection" className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"></img>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
