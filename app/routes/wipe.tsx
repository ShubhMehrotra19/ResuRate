import { useEffect, useState } from "react";
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
            <div className="p-6 max-w-4xl mx-auto">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <strong>Error:</strong> {error}
                    <button
                        onClick={clearError}
                        className="ml-2 text-red-600 hover:text-red-800 underline"
                    >
                        Clear Error
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Wipe App Data</h1>

            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
                <strong>Warning:</strong> This will permanently delete all your files and data. This action cannot be undone.
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Authenticated as: {auth.user?.username || 'Unknown User'}
                    </h2>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Existing Files ({files.length})
                </h3>

                {files.length === 0 ? (
                    <p className="text-gray-500 italic">No files found</p>
                ) : (
                    <div className="grid gap-2 max-h-64 overflow-y-auto">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex items-center">
                                    <span className="text-blue-600 mr-2">📄</span>
                                    <span className="font-medium text-gray-700">{file.name}</span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {file.size ? `${Math.round(file.size / 1024)} KB` : ''}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {deleteSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <strong>Success:</strong> All app data has been wiped successfully.
                </div>
            )}

            <div className="flex justify-center">
                <button
                    className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                        isDeleting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-red-500 hover:bg-red-600 cursor-pointer'
                    }`}
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? (
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Wiping Data...
                        </div>
                    ) : (
                        'Wipe All App Data'
                    )}
                </button>
            </div>
        </div>
    );
};

export default WipeApp;