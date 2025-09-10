import React from "react"; 
import MainLayout from "../components/layout/MainLayout";
import shopmonk from "../assets/shopmonk.mp4";

const AiVideo = () => {
    return (
        <MainLayout>
            <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                {/* Video Section */}
                <div className="w-full max-w-3xl mb-6">
                    <video
                        src={shopmonk}
                        controls
                        autoPlay
                        className="w-full rounded-2xl shadow-lg border border-gray-200"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Paragraph Section */}
                <p className="text-gray-700 text-lg text-center max-w-2xl">
                    Watch how the AI model is generated step by step using advanced AI techniques. 
                    This demonstration takes you through the entire process, 
                    giving you a clear insight into AI model creation.
                </p>
            </div>
        </MainLayout>
    );
};

export default AiVideo;
