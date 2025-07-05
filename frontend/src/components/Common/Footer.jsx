import { Link } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 py-8 bg-[#f9ebe6]">
      <div className="container px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Don’t miss out - get updates on new drops, special events, and
            online-only perks.
          </p>
          <p className="font-medium text-sm mb-6 text-gray-700">
            Sign up now and enjoy 10% off on your first order!
          </p>

          {/* Newsletter form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-1/2 p-3 text-sm border-l border-t border-b border-[#B2674B] rounded-l-lg focus:outline-none focus:ring-none transition-all"
              required
            />
            <button
              type="submit"
              className="bg-[#B2674B] text-sm text-white py-3 px-6 rounded-r-lg hover:bg-[#954C2E] transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
        {/* Shop Links */}
          <div>
            <h3 className="text-lg text-gray-800 mb-4"> Shop </h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <Link to="#" className="hover:text-[#B2674B] transition-colors">
                  Men's Top Wear
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#B2674B] transition-colors">
                  Women's Top Wear
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#B2674B] transition-colors">
                  Men's Bottom Wear
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#B2674B] transition-colors">
                  Women's Bottom Wear
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg text-gray-800 mb-4">Support</h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <Link to="#" className="hover:text-[#B2674B] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#B2674B] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#B2674B] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#B2674B] transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
            <div className="flex items-center space-x-4 mb-6">
              <a
                href="http://www.facebook.com"
                target="_blank"
                rel="nooperner noreferre"
                className="hover:text-[#B2674B] transition-colors"
              >
                <TbBrandMeta className="h-5 w-5" />
              </a>
              <a
                href="http://www.instagram.com"
                target="_blank"
                rel="nooperner noreferre"
                className="hover:text-[#B2674B] transition-colors"
              >
                <IoLogoInstagram className="h-5 w-5" />
              </a>
              <a
                href="http://www.x.com"
                target="_blank"
                rel="nooperner noreferre"
                className="hover:text-[#B2674B] transition-colors"
              >
                <RiTwitterXLine className="h-4 w-4" />
              </a>
            </div>

            <p className="text-lg text-gray-800 mb-4">Call Us</p>
            <p>
              <FiPhoneCall className="inline-block mr-2" />
              0123-456-789
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container px-5 md:px-10 mt-12 border-t border-gray-300 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          © 2025, Trenzic. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
