import type { Route } from "./+types/home";
import { Navbar } from "~/components/Navbar";
import { resumes } from "../../constants";
import { ResumeCard } from "~/components/ResumeCard";
import * as React from "react";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "ResuRate" },
        { name: "description", content: "Smart feedback for your upcoming dream job" },
    ];
}

const StatsCard = ({ number, label }: { number: string, label: string }) => (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
        <div className="text-3xl font-bold text-white mb-2">{number}</div>
        <div className="text-gray-400 text-sm font-medium">{label}</div>
    </div>
);

const FeatureCard = ({
                         icon,
                         title,
                         description,
                     }: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) => (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
        <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
);

const FloatingOrbs = () => (
    <>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
    </>
);

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
            <FloatingOrbs />

            <div className="relative z-10">
                <Navbar />

                <section className="relative">
                    <div className="container mx-auto px-6 py-16">
                        <div className="text-center mb-16">
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Track Your Applications &{" "}
                                <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                                    Resume Ratings
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Review your submissions and get AI-powered feedback to land your dream job
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            <StatsCard number="2.5k+" label="Resumes Analyzed" />
                            <StatsCard number="89%" label="Success Rate" />
                            <StatsCard number="24/7" label="AI Support" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <FeatureCard
                                icon={
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                }
                                title="Smart Analytics"
                                description="Get detailed insights on your resume performance and application success rates"
                            />
                            <FeatureCard
                                icon={
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                }
                                title="AI-Powered Feedback"
                                description="Receive intelligent suggestions to improve your resume and increase interview chances"
                            />
                            <FeatureCard
                                icon={
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                                title="Application Tracking"
                                description="Monitor all your job applications in one place with real-time status updates"
                            />
                        </div>

                        {resumes.length > 0 ? (
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl font-bold text-white">Your Resumes</h2>
                                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-4 py-2">
                                        <span className="text-gray-300 text-sm font-medium">Trusted </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {resumes.map((resume) => (
                                        <ResumeCard key={resume.id} resume={resume} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 max-w-md mx-auto">
                                    <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">No Resumes Yet</h3>
                                    <p className="text-gray-400 mb-6">Upload your first resume to get started with AI-powered feedback</p>
                                    <button className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:from-gray-500 hover:to-gray-700 transition-all duration-300 hover:scale-105">
                                        Upload Resume
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
