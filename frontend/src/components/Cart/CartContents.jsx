import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const cartProduct = [
    {
      productId: 1,
      name: "T-Shirt",
      size: "M",
      color: "Blue",
      quantity: 1,
      price: 350,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Jeans",
      size: "L",
      color: "Black",
      quantity: 1,
      price: 1200,
      image: "https://picsum.photos/200?random=2",
    },
  ];

  return (
    <div>
      {cartProduct.map((product, index) => {
        return (
          <div
            key={index}
            className="flex items-start justify-between py-4 border-b-2"
          >
            <div className="flex items-start">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover mr-4 rounded"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  Size: {product.size} | Color: {product.color}
                </p>

                <div className="flex items-center mt-2 gap-2">
                  <button className="border rounded px-2 py-1 text-xl font-medium">
                    -
                  </button>
                  <p className="text-sm">{product.quantity}</p>
                  <button className="border rounded px-2 py-1 text-xl font-medium">
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="font-semibold">
                Rs. {product.price.toLocaleString()}
              </p>
              <button>
                <RiDeleteBin3Line className="w-6 h-6 mt-2 text-red-500" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;
