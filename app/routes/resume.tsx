import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
    { title: 'ResuRate | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback: data.feedback });
        }

        loadResume();
    }, [id]);

    return (
        <main className="bg-black min-h-screen w-full !pt-0">
            <nav className="w-full px-6 py-4 flex items-center">
                <Link
                    to="/"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-gray-100 rounded-full px-4 py-2 shadow-lg transition-all backdrop-blur z-30"
                >
                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                         strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7"/>
                    </svg>
                    <span className="text-gray-200 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-black bg-cover h-[100vh] sticky top-0 flex items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit p-4">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={imageUrl}
                                    className="w-full h-full object-contain rounded-2xl shadow-2xl border border-white/10"
                                    title="resume"
                                />
                            </a>
                        </div>
                    )}
                </section>
                <section className="feedback-section px-4 py-8 flex-1 w-full max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-100 mb-8">Resume Review</h2>
                    <div className="flex flex-col gap-8">
                        {feedback ? (
                            <>
                                <div className="bg-gray-900/80 border border-white/10 rounded-3xl shadow-2xl p-6">
                                    <Summary feedback={feedback} />
                                </div>
                                <div className="bg-gray-900/80 border border-white/10 rounded-3xl shadow-2xl p-6">
                                    <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                </div>
                                <div className="bg-gray-900/80 border border-white/10 rounded-3xl shadow-2xl p-6">
                                    <Details feedback={feedback} />
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center">
                                <img src="/images/resume-scan-2.gif" className="w-40" alt="Analyzing..." />
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}
export default Resume
