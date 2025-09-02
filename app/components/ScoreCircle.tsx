import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ScoreCircle = ({ score = 75 }: { score: number }) => {
    const circleRef = useRef(null);
    const scoreRef = useRef(null);
    const progressRef = useRef(null);

    const radius = 35;
    const stroke = 6;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(progressRef.current, {
                strokeDasharray: circumference,
                strokeDashoffset: circumference
            });

            gsap.set(scoreRef.current, {
                opacity: 0,
                scale: 0.5
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const progress = score / 100;
                        const strokeDashoffset = circumference * (1 - progress);

                        gsap.to(progressRef.current, {
                            strokeDashoffset,
                            duration: 1.5,
                            ease: "power2.out",
                            delay: 0.3
                        });

                        gsap.to(scoreRef.current, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.6,
                            ease: "back.out(1.7)",
                            delay: 0.5
                        });

                        observer.unobserve(entry.target);
                    }
                });
            });

            if (circleRef.current) observer.observe(circleRef.current);

            return () => observer.disconnect();
        }, circleRef);

        return () => ctx.revert();
    }, [score, circumference]);

    const getScoreColor = (score: number) => {
        if (score >= 80) return { from: '#10B981', to: '#059669' }; // Green
        if (score >= 60) return { from: '#F59E0B', to: '#D97706' }; // Yellow
        return { from: '#EF4444', to: '#DC2626' }; // Red
    };

    const colors = getScoreColor(score);

    return (
        <div ref={circleRef} className="relative w-[90px] h-[90px] group">
            <svg
                height="100%"
                width="100%"
                viewBox="0 0 90 90"
                className="transform -rotate-90 group-hover:scale-110 transition-transform duration-300"
            >
                <defs>
                    <linearGradient id={`grad-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colors.from} />
                        <stop offset="100%" stopColor={colors.to} />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                <circle
                    cx="45"
                    cy="45"
                    r={normalizedRadius}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={stroke}
                    fill="transparent"
                />

                <circle
                    ref={progressRef}
                    cx="45"
                    cy="45"
                    r={normalizedRadius}
                    stroke={`url(#grad-${score})`}
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    className="transition-all duration-300"
                />
            </svg>

            <div ref={scoreRef} className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold text-lg text-white group-hover:scale-110 transition-transform duration-300">
                    {score}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                    /100
                </span>
            </div>

            <div className="absolute -inset-2 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur-xl pointer-events-none"
                 style={{
                     background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`
                 }}
            ></div>
        </div>
    );
};

export default ScoreCircle;