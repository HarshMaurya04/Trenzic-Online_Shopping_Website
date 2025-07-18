import { Link } from "react-router-dom";
import heroImg from "../../assets/trenzic-hero.webp";

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Trenzic"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Vacation <br /> Ready
          </h1>

          <p className="text-sm md:text-lg mb-6">
            Explore vacation-ready outfits with speedy worldwide delivery.
          </p>

          <Link
            to="#"
            className="bg-white text-amber-950 px-6 py-2 rounded-lg text-lg font-semibold"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
