import { type FormEvent, useState } from 'react'
import { Navbar } from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    };

    const handleAnalyze = async ({
                                     companyName,
                                     jobTitle,
                                     jobDescription,
                                     file
                                 }: {
        companyName: string, jobTitle: string, jobDescription: string, file: File
    }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if (!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        };
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        );
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    };

    return (
        <main className="bg-black min-h-screen w-full">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-100 mb-2">
                        Smart feedback for your dream job
                    </h1>
                    {isProcessing ? (
                        <>
                            <h2 className="text-lg font-semibold text-blue-300 mb-4">{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full max-w-xs mx-auto rounded-xl shadow-lg" alt="Analyzing..." />
                        </>
                    ) : (
                        <h2 className="text-lg text-gray-300 mb-2">
                            Drop your resume for an <span className="text-blue-400 font-semibold">ATS</span> score and improvement tips
                        </h2>
                    )}
                    {!isProcessing && (
                        <form
                            id="upload-form"
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 mt-8 max-w-lg mx-auto bg-gray-900/70 border border-white/10 rounded-2xl shadow-2xl p-6"
                        >
                            <div className="form-div">
                                <label htmlFor="company-name" className="block font-bold text-sm text-gray-200 mb-2">
                                    Company Name <span className='text-lg font-semibold text-red-500/70'>*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="company-name"
                                    placeholder="Company Name"
                                    id="company-name"
                                    className="w-full py-2 px-4 rounded-lg bg-black/60 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title" className="block font-bold text-sm text-gray-200 mb-2">
                                    Job Title <span className='text-lg font-semibold text-red-500/70'>*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="job-title"
                                    placeholder="Job Title"
                                    id="job-title"
                                    className="w-full py-2 px-4 rounded-lg bg-black/60 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description" className="block font-bold text-sm text-gray-200 mb-2">
                                    Job Description <span className='text-lg font-semibold text-red-500/70'>*</span>
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    name="job-description"
                                    placeholder="Job Description"
                                    id="job-description"
                                    className="w-full py-2 px-4 rounded-lg bg-black/60 border border-white/10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
                                />
                            </div>
                            <div className="form-div">
                                <label htmlFor="uploader" className="block font-bold text-sm text-gray-200 mb-2">
                                    Upload Resume
                                </label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>
                            <button
                                className="primary-button w-full mt-3 py-3 text-lg rounded-xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white shadow-lg transition-all duration-300 hover:from-blue-500 hover:via-blue-400 hover:to-blue-600 hover:scale-[1.01] active:scale-95"
                                type="submit"
                            >
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}

export default Upload;
