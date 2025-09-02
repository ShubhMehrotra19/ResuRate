import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-400'
        : score > 49
            ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className="w-full px-4 py-3 rounded-2xl bg-gray-900/70 border border-white/10 my-3 flex justify-between items-center shadow">
            <div className="flex flex-row gap-2 items-center">
                <p className="text-xl text-gray-100 font-bold">{title}</p>
                <ScoreBadge score={score} />
            </div>
            <p className="text-xl font-mono">
                <span className={textColor}>{score}</span>
                <span className="text-gray-400">/100</span>
            </p>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="w-full bg-gray-900/80 border border-white/10 rounded-3xl shadow-2xl">
            <div className="flex md:flex-row flex-col items-center gap-8 p-6 pb-4">
                <ScoreGauge score={feedback.overallScore} />
                <div className="flex flex-col gap-2 justify-center text-center md:text-left">
                    <h2 className="text-2xl font-extrabold text-gray-100">Your Resume Score</h2>
                    <p className="text-sm text-gray-400">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>
            <div className="px-2 pb-4">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}
export default Summary
