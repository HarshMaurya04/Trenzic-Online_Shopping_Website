import { Link } from "react-router-dom";
import mensCollectionImg from "../../assets/mens-collection.webp";
import womensCollectionImg from "../../assets/womens-collection.webp";

const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container px-5 md:px-24 flex flex-col md:flex-row gap-12">
        {/* Men's collection */}
        <div className="relative flex-1">
          <img
            src={mensCollectionImg}
            alt="Men's collection"
            className="w-full h-[600px] object-cover rounded-3xl"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold text-amber-900 mb-3">
              Men's Collection
            </h2>
            <Link
              to="collections/all?gender=Men"
              className="text-amber-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Women's collection */}
        <div className="relative flex-1">
          <img
            src={womensCollectionImg}
            alt="Women's collection"
            className="w-full h-[600px] object-cover rounded-3xl"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4 rounded-2xl">
            <h2 className="text-2xl font-bold text-amber-900 mb-3">
              Women's Collection
            </h2>
            <Link
              to="collections/all?gender=Women"
              className="text-amber-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
