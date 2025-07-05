import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product.id}`} className="block">
          <div className="rounded-2xl">
            <div className="w-full h-96 mb-4 text-center">
              <img
                src={product.image.url}
                alt={product.image.altText || product.name}
                className="w-full h-full object-cover rounded-2xl"
              />  
            </div>
            <h3 className="text-sm mb-1 ml-1">{product.name}</h3>
            <p className="text-gray-500 font-medium text-sm ml-1">Rs.{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
