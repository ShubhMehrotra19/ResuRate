import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const { auth } = usePuterStore();
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        if (auth.isAuthenticated && auth.user) {
            const name =  auth.user.username || "";
            setUserName(name);
        } else {
            setUserName("");
        }
    }, [auth.isAuthenticated, auth.user]);

    const getUserInitial = () => {
        if (userName && userName.length > 0) {
            return userName.charAt(0).toUpperCase();
        }
        return "?";
    };

    const handleSignOut = async () => {
        if (confirm('Are you sure you want to sign out?')) {
            await auth.signOut();
        }
    };

    return (
        <nav className='navbar flex items-center justify-between p-4 bg-white shadow-md'>
            <Link to={"/"} className="hover:opacity-80 transition-opacity">
                <p className='text-2xl font-bold text-gradient'>ResuRate</p>
            </Link>

            <div className="flex items-center gap-4">
                <Link to={'/upload'} className='primary-button w-fit'>
                    Upload Resume
                </Link>

                <div className="relative group">
                    <div className='flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white cursor-pointer hover:shadow-lg transition-shadow'>
                        <p className='text-lg font-semibold'>{getUserInitial()}</p>
                    </div>

                    {/* Dropdown menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
                        <div className="py-2">
                            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                                <p className="font-semibold">Signed in as:</p>
                                <p className="text-gray-600 truncate">{userName || 'User'}</p>
                            </div>
                            <Link
                                to="/wipe"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                Wipe Data
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};