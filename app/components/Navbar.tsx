import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export const Navbar = () => {
    const { auth } = usePuterStore();
    const [userName, setUserName] = useState<string>("");
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const buttonsRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (auth.isAuthenticated && auth.user) {
            const name =  auth.user.username || "";
            setUserName(name);
        } else {
            setUserName("");
        }
    }, [auth.isAuthenticated, auth.user]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(logoRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            gsap.fromTo(buttonsRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
            );
        }, navRef);

        return () => ctx.revert();
    }, []);

    // Handle outside click to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !(dropdownRef.current as HTMLElement).contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    const getUserInitial = () => {
        if (userName && userName.length > 0) {
            return userName.charAt(0).toUpperCase();
        }
        return "?";
    };

    const handleSignOut = async () => {
        if (confirm('Are you sure you want to sign out?')) {
            await auth.signOut();
            setDropdownOpen(false);
        }
    };

    return (
        <nav ref={navRef} className='z-[9998] relative flex items-center justify-between p-6 backdrop-blur-xl bg-white/5 border-b border-white/10'>
            <Link to={"/"} className="hover:opacity-80 transition-opacity" ref={logoRef}>
                <p className='text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
                    ResuRate
                </p>
            </Link>

            <div ref={buttonsRef} className="flex items-center gap-4">
                <Link
                    to={'/upload'}
                    className='group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-105 hover:shadow-lg'
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Resume
                    </span>
                </Link>

                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen((open) => !open)}
                        className='flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 text-white cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm focus:outline-none'
                        aria-label="Open user menu"
                    >
                        <p className='text-lg font-semibold'>{getUserInitial()}</p>
                    </button>

                    {dropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 w-52
                                    backdrop-blur-xl bg-gray-600 border border-white/20
                                    rounded-2xl shadow-2xl
                                    transition-all duration-300 z-[9999] overflow-hidden animate-fadeIn"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-500 pointer-events-none"></div>
                            <div className="relative py-2">
                                <div className="px-4 py-3 text-sm border-b border-white/10">
                                    <p className="font-semibold text-white z-20">Signed in as:</p>
                                    <p className="text-gray-300 truncate z-20">{userName || 'User'}</p>
                                </div>
                                <Link
                                    to="/wipe"
                                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition-colors duration-200 hover:text-white z-20"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Wipe Data
                                    </div>
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200 hover:text-red-300 z-20"
                                >
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign Out
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px);}
                    to   { opacity: 1; transform: translateY(0);}
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease;
                }
            `}</style>
        </nav>
    );
};
