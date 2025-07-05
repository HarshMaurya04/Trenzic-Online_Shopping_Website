import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrival from "../components/Products/NewArrival";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";

const placeholderProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 2000,
    image: {
      url: "https://picsum.photos/500/500?random=15",
      altTrxt: "Product 1",
    },
  },
  {
    id: 2,
    name: "Product 2",
    price: 2000,
    image: {
      url: "https://picsum.photos/500/500?random=16",
      altTrxt: "Product 2",
    },
  },
  {
    id: 3,
    name: "Product 3",
    price: 2000,
    image: {
      url: "https://picsum.photos/500/500?random=17",
      altTrxt: "Product 3",
    },
  },
  {
    id: 4,
    name: "Product 4",
    price: 2000,
    image: {
      url: "https://picsum.photos/500/500?random=18",
      altTrxt: "Product 4",
    },
  },
  {
    id: 5,
    name: "Product 5",
    price: 2000,
    image: {
      url: "https://picsum.photos/500/500?random=19",
      altTrxt: "Product 5",
    },
  },
  {
    id: 6,
    name: "Product 6",
    price: 2000,
    image: {
      url: "https://picsum.photos/500/500?random=20",
      altTrxt: "Product 6",
    },
  },
  {
    id: 7,
    name: "Product 7",
    price: 2000,
    image: {
      url: "https://picsum.photos/500/500?random=21",
      altTrxt: "Product 7",
    },
  },
  {
    id: 8,
    name: "Product 8",
    price: 2000,
    image: {
      url: "https://picsum.photos/500/500?random=22",
      altTrxt: "Product 8",
    },
  },
];

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrival />

      {/* Best Seller */}
      <h1 className="text-3xl text-center font-bold mt-16">Best Seller</h1>
      <ProductDetails />

      <div className="container px-5 md:px-24 mt-4 mb-5">
        <h2 className="text-3xl text-center font-semibold mb-8">
          Top Wear for Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
