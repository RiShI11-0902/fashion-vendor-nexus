import React from "react"; 
import MainLayout from "../components/layout/MainLayout";
import shopmonk from "../assets/shopmonk.mp4";

const AiVideo = () => {
    return (
        <MainLayout>
            <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-20">
                <div className="flex items-center gap-3 mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">AI Video Generator</h1>
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">Coming Soon</span>
                </div>

                {/* Video Section */}
                <div className="w-full max-w-3xl mb-6">
                    <video
                        src={shopmonk}
                        controls
                        autoPlay
                        className="w-full rounded-2xl shadow-lg"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Paragraph Section */}
                <p className="text-muted-foreground text-lg text-center max-w-2xl">
                    Watch how the AI model is generated step by step using advanced AI techniques. 
                    This demonstration takes you through the entire process, 
                    giving you a clear insight into AI model creation.
                </p>
            </div>
        </MainLayout>
    );
};

export default AiVideo;
