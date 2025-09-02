import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
    { title: 'Resumind | Auth' },
    { name: 'description', content: 'Log into your account' },
]);

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next]);

    return (
        <main className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gray-950">
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="backdrop-blur-3xl bg-[#101014]/20 border border-white/10 rounded-3xl shadow-2xl p-8 relative overflow-hidden">


                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-600 rounded-full mb-6 shadow-lg backdrop-blur-sm">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold mb-2 text-gray-100 tracking-tight">
                                Welcome
                            </h1>
                            <p className="text-gray-400 text-lg font-medium">
                                Log In to Continue Your Job Journey
                            </p>
                        </div>

                        <div className="space-y-4 cursor-pointer">
                            {isLoading ? (
                                <button className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 cursor-not-allowed shadow-lg shadow-blue-900/20">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-2 border-blue-300 border-t-white rounded-full animate-spin"></div>
                                        <span>Signing you in...</span>
                                    </div>
                                </button>
                            ) : (
                                <>
                                    {auth.isAuthenticated ? (
                                        <button
                                            className="cursor-pointer w-full group relative overflow-hidden bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 hover:from-blue-700 hover:via-blue-500 hover:to-blue-300 hover:scale-105 hover:shadow-2xl active:scale-95 border border-white/20 backdrop-blur-xl shadow-lg shadow-blue-900/10"
                                            onClick={auth.signOut}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                            <span className="relative flex items-center justify-center gap-3">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Log Out
                                            </span>
                                        </button>
                                    ) : (
                                        <button
                                            className="cursor-pointer w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg backdrop-blur-xl border border-white/20 transition-all duration-300 hover:from-blue-500 hover:via-blue-400 hover:to-blue-600 hover:scale-105 hover:shadow-2xl active:scale-95 shadow-lg shadow-blue-900/10"
                                            onClick={auth.signIn}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                            <span className="relative flex items-center justify-center gap-3">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                </svg>
                                                Log In
                                            </span>
                                        </button>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm font-semibold">
                                Secure authentication powered by Puter
                            </p>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-800"></div>
                </div>

                <div className="absolute -inset-1 bg-gray-900/20 rounded-3xl blur-lg -z-10"></div>
            </div>

            <style>{`
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </main>
    );
};

export default Auth;
