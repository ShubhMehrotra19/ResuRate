import { useEffect, useState } from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, error, clearError, fs, kv } = usePuterStore();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const loadFiles = async () => {
        try {
            const files = (await fs.readDir("./")) as FSItem[];
            setFiles(files || []);
        } catch (err) {
            console.error('Error loading files:', err);
            setFiles([]);
        }
    };

    useEffect(() => {
        loadFiles();
    }, []);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to wipe all app data? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        setDeleteSuccess(false);

        try {
            // Delete all files
            for (const file of files) {
                try {
                    await fs.delete(file.path);
                } catch (err) {
                    console.error(`Error deleting file ${file.name}:`, err);
                }
            }

            // Clear all key-value store data
            try {
                await kv.flush();
            } catch (err) {
                console.error('Error flushing KV store:', err);
            }

            // Reload files to show updated state
            await loadFiles();
            setDeleteSuccess(true);

            // Clear success message after 3 seconds
            setTimeout(() => setDeleteSuccess(false), 3000);
        } catch (err) {
            console.error('Error during wipe operation:', err);
        } finally {
            setIsDeleting(false);
        }
    };

    if (error) {
        return (
            <div className="bg-black min-h-screen p-6 max-w-3xl mx-auto mt-12">
                <Link
                    to="/"
                    className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-100 rounded-full shadow-lg transition-all backdrop-blur-md"
                >
                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                         strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7"/>
                    </svg>
                    Back
                </Link>
                <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4 font-medium flex items-center justify-between">
                    <div>
                        <strong>Error:</strong> {error}
                    </div>
                    <button
                        onClick={clearError}
                        className="ml-4 px-3 py-1 text-red-400 hover:text-red-100 font-semibold rounded hover:bg-red-500/10 transition"
                    >
                        Clear
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen p-6 relative">
            <Link
                to="/"
                className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-100 rounded-full shadow-lg transition-all backdrop-blur-md"
            >
                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                     strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M15 19l-7-7 7-7"/>
                </svg>
                Back
            </Link>
            <div className="max-w-3xl mx-auto mt-12">
                <h1 className="text-4xl font-extrabold mb-3 text-gray-100">
                    Wipe App Data
                </h1>
                <p className="mb-8 text-lg text-gray-400">
                    Remove all your files and reset your workspace instantly. This action <span className="text-red-400 font-semibold">cannot</span> be undone.
                </p>

                <div className="bg-yellow-500/10 border-l-4 border-yellow-500/40 text-yellow-300 px-6 py-4 rounded-xl mb-6 font-semibold shadow">
                    <span role="img" aria-label="warning" className="mr-2">⚠️</span>
                    <strong>Warning:</strong> All your files and saved data will be permanently deleted.
                </div>

                <div className="bg-gray-900/50 rounded-2xl border border-white/10 shadow-md p-6 mb-6">
                    <div className="flex items-center mb-4">
                        <svg className="w-7 h-7 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.45 0 4.765.588 6.879 1.804A6.978 6.978 0 0012 21a6.978 6.978 0 00-6.879-3.196zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <h2 className="text-lg font-bold text-gray-200">
                            Authenticated as: <span className="font-mono text-blue-300">{auth.user?.username || 'Unknown User'}</span>
                        </h2>
                    </div>
                </div>

                <div className="bg-gray-900/50 rounded-2xl border border-white/10 shadow-md p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-200 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17H20V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10h5"/>
                        </svg>
                        Your Files ({files.length})
                    </h3>
                    {files.length === 0 ? (
                        <p className="text-gray-500 italic">No files found</p>
                    ) : (
                        <div className="grid gap-2 max-h-52 overflow-y-auto">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex items-center justify-between p-3 border border-gray-800 rounded-xl bg-gray-800/50 hover:bg-gray-700 transition"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">📄</span>
                                        <span className="font-medium text-gray-100">{file.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-400">
                                        {file.size ? `${Math.round(file.size / 1024)} KB` : ''}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {deleteSuccess && (
                    <div className="bg-green-500/10 border-l-4 border-green-500 text-green-300 px-6 py-3 rounded-xl mb-6 font-semibold flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        All app data has been wiped successfully.
                    </div>
                )}

                <div className="flex justify-center">
                    <button
                        className={`px-8 py-4 text-lg rounded-xl font-extrabold shadow-lg transition-all duration-300
                            ${
                            isDeleting
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 hover:scale-105'
                        }
                            text-white tracking-wide uppercase`}
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12" cy="12" r="10"
                                        stroke="currentColor" strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                Wiping Data...
                            </span>
                        ) : (
                            'Wipe All App Data'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WipeApp;
