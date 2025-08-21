
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-white">
          <Link 
            to="/design" 
            className="text-white hover:text-white/80 transition-colors duration-200"
          >
            Design Tool
          </Link>
          <Link 
            to="/contact" 
            className="text-white hover:text-white/80 transition-colors duration-200"
          >
            Contact Us
          </Link>
          <Link 
            to="/terms" 
            className="text-white hover:text-white/80 transition-colors duration-200"
          >
            Terms and Conditions
          </Link>
        </div>
        <div className="text-center text-white/70 text-sm mt-8">
          © 2025 Decorspaceai. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
