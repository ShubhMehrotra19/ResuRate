// src/components/Footer.jsx
const Footer = () => (
    <footer className="relative z-20 w-full bg-black border-t border-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Branding */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 shadow-lg">
                    <span className="text-2xl text-white font-bold">R</span>
                </div>
                <span className="text-lg font-semibold text-gray-100 tracking-wider select-none">
          ResuRate
        </span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <a href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About</a>
                <a href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy</a>
                <a href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a>
            </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-500 select-none">
            &copy; {new Date().getFullYear()} ResuRate · All rights reserved.
        </div>
    </footer>
);

export default Footer;
