import { useState } from 'react';
import { FaExclamationTriangle } from "react-icons/fa"; // استيراد الأيقونة
import Get_file from "../components/Free_page/Get_file.tsx";
import { MainLayout } from "../components/layout/MainLayout.tsx";

const FreePlan = () => {
    const [file, setFile] = useState<File | null>(null);

    return (
        <MainLayout>
            {/* خطوط جانبية متحركة */}
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-green-400 via-blue-500 to-pink-500 animate-pulse z-10"></div>
            <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b to-green-400 via-blue-500 from-pink-500 animate-pulse z-10"></div>

            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white">
                
                {/* العنوان */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-400 text-center mb-4 whitespace-normal">
                    SAST - Static Application Security Testing
                </h1>

                {/* التحذير */}
                <p className="flex items-center text-center text-sm sm:text-base text-yellow-400 max-w-xl mb-6">
                    <FaExclamationTriangle className="mr-2 text-lg" />
                    Warning: You can scan only one file at a time. The result will be displayed in Markdown format.
                </p>

                {/* مكون رفع الملف */}
                <div className="w-full max-w-3xl p-4">
                    <Get_file file={file} setFile={setFile} />
                </div>
            </div>
        </MainLayout>
    );
};

export default FreePlan;
