import {
  HiShoppingBag, 
  HiOutlineCreditCard,
} from "react-icons/hi";
import {HiArrowPathRoundedSquare} from "react-icons/hi2"

const FeaturesSection = () => {
  return (
    <section className="pt-5 pb-16 px-5 md:px-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <HiShoppingBag className="text-4xl text-blue-600" />
          </div>
          <h4 className="text-lg font-semibold mb-2 tracking-wide">
            FREE INTERNATIONAL SHIPPING
          </h4>
          <p className="text-gray-600 text-sm">On all orders over Rs.8500</p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <HiArrowPathRoundedSquare className="text-4xl text-blue-600" />
          </div>
          <h4 className="text-lg font-semibold mb-2 tracking-wide">
            45 DAYS RETURN
          </h4>
          <p className="text-gray-600 text-sm">Money back guarantee</p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <HiOutlineCreditCard className="text-4xl text-blue-600" />
          </div>
          <h4 className="text-lg font-semibold mb-2 tracking-wide">
            SECURE CHECKOUT
          </h4>
          <p className="text-gray-600 text-sm">
            100% secured checkout process
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
