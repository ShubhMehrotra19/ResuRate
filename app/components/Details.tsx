import { cn } from "~/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from "./Accordion";
import ScoreBadge from "~/components/ScoreBadge";

const ScoreContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gray-900/70 border border-white/10 rounded-2xl shadow p-3">{children}</div>
);

const CategoryHeader = ({
                            title,
                            categoryScore,
                        }: {
    title: string;
    categoryScore: number;
}) => (
    <div className="flex flex-row gap-4 items-center py-2">
        <p className="text-xl font-semibold text-gray-100">{title}</p>
        <ScoreBadge score={categoryScore} />
    </div>
);

const CategoryContent = ({
                             tips,
                         }: {
    tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => (
    <div className="flex flex-col gap-4 items-center w-full">
        <div className="w-full rounded-lg px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
                <div className="flex flex-row gap-2 items-center" key={index}>
                    <img
                        src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                        alt="score"
                        className="size-5"
                    />
                    <p className={
                        tip.type === "good"
                            ? "text-green-400 text-base"
                            : "text-yellow-400 text-base"
                    }>
                        {tip.tip}
                    </p>
                </div>
            ))}
        </div>
        <div className="flex flex-col gap-4 w-full">
            {tips.map((tip, index) => (
                <div
                    key={index + tip.tip}
                    className={cn(
                        "flex flex-col gap-2 rounded-2xl p-4",
                        tip.type === "good"
                            ? "bg-green-900/30 border border-green-500/30 text-green-200"
                            : "bg-yellow-900/20 border border-yellow-400/20 text-yellow-200"
                    )}
                >
                    <div className="flex flex-row gap-2 items-center">
                        <img
                            src={
                                tip.type === "good"
                                    ? "/icons/check.svg"
                                    : "/icons/warning.svg"
                            }
                            alt="score"
                            className="size-5"
                        />
                        <p className="text-lg font-semibold">{tip.tip}</p>
                    </div>
                    <p className="text-gray-200 text-sm">{tip.explanation}</p>
                </div>
            ))}
        </div>
    </div>
);

const Details = ({ feedback }: { feedback: Feedback }) => (
    <div className="flex flex-col gap-4 w-full">
        <Accordion>
            <AccordionItem id="tone-style">
                <AccordionHeader itemId="tone-style">
                    <CategoryHeader
                        title="Tone & Style"
                        categoryScore={feedback.toneAndStyle.score}
                    />
                </AccordionHeader>
                <AccordionContent itemId="tone-style">
                    <ScoreContainer>
                        <CategoryContent tips={feedback.toneAndStyle.tips} />
                    </ScoreContainer>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem id="content">
                <AccordionHeader itemId="content">
                    <CategoryHeader
                        title="Content"
                        categoryScore={feedback.content.score}
                    />
                </AccordionHeader>
                <AccordionContent itemId="content">
                    <ScoreContainer>
                        <CategoryContent tips={feedback.content.tips} />
                    </ScoreContainer>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem id="structure">
                <AccordionHeader itemId="structure">
                    <CategoryHeader
                        title="Structure"
                        categoryScore={feedback.structure.score}
                    />
                </AccordionHeader>
                <AccordionContent itemId="structure">
                    <ScoreContainer>
                        <CategoryContent tips={feedback.structure.tips} />
                    </ScoreContainer>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem id="skills">
                <AccordionHeader itemId="skills">
                    <CategoryHeader
                        title="Skills"
                        categoryScore={feedback.skills.score}
                    />
                </AccordionHeader>
                <AccordionContent itemId="skills">
                    <ScoreContainer>
                        <CategoryContent tips={feedback.skills.tips} />
                    </ScoreContainer>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
);

export default Details;
