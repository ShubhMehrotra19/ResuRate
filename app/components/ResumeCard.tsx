import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";

export const ResumeCard = ({ resume }: { resume: Resume }) => {
    return (
        <div
            className='backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 overflow-hidden relative'
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

            <div className='flex items-start justify-between mb-6 relative z-10'>
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <h2 className='text-white font-bold text-xl break-words leading-tight'>
                        {resume.companyName}
                    </h2>
                    <h3 className='text-lg break-words text-gray-400 leading-relaxed'>
                        {resume.jobTitle}
                    </h3>
                </div>
                <div className='flex-shrink-0 ml-4'>
                    <ScoreCircle score={resume.feedback.overallScore} />
                </div>
            </div>

            <div className='relative overflow-hidden rounded-2xl border border-white/10'>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
                <img
                    src={resume.imagePath}
                    alt='resume'
                    className='w-full h-[350px] max-sm:h-[200px] object-cover object-top transition-transform duration-300'
                />
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-400 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Active Application</span>
                </div>
                <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
