const Footer = () => {
  return (
    <footer className="border-t-2 py-12">
      <div className="container px-5 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Don’t miss out - get updates on new drops, special events, and
            online-only perks.
          </p>
          <p className="mb-2">Sign up now and enjoy 10% off on your first order!</p>

          {/* Newsletter form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 text-sm border-l border-t border-b border-[#B2674B] rounded-l-lg focus:outline-none focus:ring-none transition-all"
              required
            />
            <button type="submit" className="bg-[#B2674B] text-sm text-white py-3 px-6 rounded-r-lg hover:bg-[#954C2E] transition-all">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
