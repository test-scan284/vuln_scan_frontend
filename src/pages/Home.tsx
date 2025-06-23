import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Shield, Lock, Search, Code } from 'lucide-react';
import Card from '../utils/Card';
import BenefitsCard from '../utils/BenefitsCard';
// import SqureModel from '../components/SqureModel';
export const Home: React.FC = () => {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Comprehensive Security",
      description: "Both dynamic and static analysis for complete coverage"
    },
    {
      icon: <Lock className="h-6 w-6 text-blue-600" />,
      title: "Advanced Protection",
      description: "State-of-the-art security scanning and analysis"
    },
    {
      icon: <Search className="h-6 w-6 text-blue-600" />,
      title: "Real-time Scanning",
      description: "Instant vulnerabil detection and reporting"
    }
  ];
  return (
    <MainLayout>
      <div className="pointer-events-none">
    {/* Left Line */}
    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-green-400 via-blue-500 to-pink-500 animate-pulse z-10"></div>

    {/* Right Line */}
    <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b to-green-400 via-blue-500 from-pink-500 animate-pulse z-10"></div>
  </div>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-200 sm:text-5xl md:text-6xl">
            Welcome to <span className="bg-gradient-to-r from-green-400  to-blue-500 bg-clip-text text-transparent">VulnScan</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Your all-in-one solution for comprehensive security analysis
          </p>
        </div>

        {/* Feature Section */}
        <div className="mt-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 xl:grid-cols-2">
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-white">DAST Analysis</h3>
                <p className="mt-2 text-sm text-gray-300">
                  Dynamic Application Security Testing for real-time vulnerability detection
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-white">SAST Analysis</h3>
                <p className="mt-2 text-sm text-gray-300">
                  Static Application Security Testing for code-level vulnerability detection
                </p>
              </div>
            </div>
          </Card>
        </div>
        </div>


        {/* <SqureModel/> */}

        
        {/* Benefits Section */}
        <div className="text-center">
          <h3 className="text-4xl font-bold text-gray-200 sm:text-5xl md:text-4xl">
              Why choose VulnScan
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 xl:grid-cols-3">
      {benefits.map((item, index) => (
        <BenefitsCard
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
      </div>
      

    </MainLayout>
  );
};