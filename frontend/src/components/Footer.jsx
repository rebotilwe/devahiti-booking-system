import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
// Import your logo - adjust the filename to match your actual file
import logo from "../assets/logo1.png"; // or .svg, .webp, etc.

export default function Footer() {
  return (
    <footer className="bg-[#4a3728] text-white/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Brand with Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="Devahiti Yoga Logo" 
                className="h-16 md:h-20 lg:h-24 w-auto object-contain"
              />
            </div>
            <p className="text-xs tracking-widest uppercase text-white/50 mb-6">
              'Day-vah-hee-tee' — Sanskrit for Divine Order
            </p>
            <p className="text-sm leading-relaxed text-white/60">
              Open-air yoga studio in Ballito. Private sessions, group classes, sound journeys, and teacher training.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl text-white mb-6">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Home", path: "/" },
                { label: "About Cheryl", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Upcoming Events", path: "/events" },
                { label: "Contact", path: "/contact" },
                { label: "Book Online", path: "/booking" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-white/60 hover:text-[#c47a5a] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-xl text-white mb-6">Get in Touch</h4>
            <div className="space-y-3 text-sm text-white/60 mb-8">
              <p>📍 Devahiti Yoga Studio</p>
              <p>Ballito, South Africa</p>
            </div>
            <div className="flex gap-4">
              {/* Instagram */}
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#c47a5a] hover:text-[#c47a5a] transition-all"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* Facebook */}
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#c47a5a] hover:text-[#c47a5a] transition-all"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              
              {/* Email */}
              <a 
                href="mailto:cheryl@devahiti.com" 
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#c47a5a] hover:text-[#c47a5a] transition-all"
                aria-label="Email"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Devahiti Yoga. All rights reserved.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            Developed by{" "}
            <a 
              href="https://afribizconnect.co.za" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#c47a5a] transition-colors inline-flex items-center gap-1"
            >
              Afribiz Connect <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}