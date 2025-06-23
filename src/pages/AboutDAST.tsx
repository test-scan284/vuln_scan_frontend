import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const AboutDAST: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-200">Understanding DAST</h1>
          <p className="mt-4 text-xl text-gray-500">
            Dynamic Application Security Testing: Your First Line of Defense
          </p>
        </div>

        <div className=" p-8 rounded-lg shadow-lg mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                {[
                  { step: 1, title: 'Crawl', desc: 'Scan application infrastructure' },
                  { step: 2, title: 'Test', desc: 'Analyze each endpoint' },
                  { step: 3, title: 'Detect', desc: 'Identify vulnerabilities' },
                  { step: 4, title: 'Report', desc: 'Generate detailed findings' }
                ].map((item) => (
                  <div key={item.step} className="bg-gray-900 p-4 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-gray-400">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              {/* Connecting Lines */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-900 -z-10 transform -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-200 mb-4">What is DAST?</h2>
            <p className="text-gray-400 mb-4">
              DAST is a black-box security testing methodology that evaluates applications without examining internal code structure. It performs real-time analysis on live applications, mimicking actual attack scenarios to identify vulnerabilities.  It may be work as proactive approach, as it's integrated early in the SDLC.
            </p>
            <div className="border-l-4 border-blue-500 pl-4 my-6">
              <p className="text-gray-400 italic">
                "Think of DAST as a security guard who doesn't just check locks but actively tries to break in to identify weaknesses."
              </p>
            </div>
          </div>


          <div className="bg-gray-900 p-6 rounded-lg shadow">
            <h2 className=" text-2xl font-bold text-gray-200 mb-4">How Does DAST Work?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span className='text-gray-200'>Crawls the application for complete infrastructure insight</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className='text-gray-200'>Tests each subdomain and URL for weaknesses</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className='text-gray-200'>Alerts upon discovering vulnerabilities</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-200">Advantages</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className='text-gray-200'>No source code access required</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className='text-gray-200'>Fewer false positives</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className='text-gray-200'>Platform independent</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className='text-gray-200'>Identifies exploitable vulnerabilities</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <XCircle className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-200">Limitations</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">×</span>
                <span className='text-gray-200'>May require manual testing</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">×</span>
                <span className='text-gray-200'>Cannot pinpoint exact vulnerability location in code</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">×</span>
                <span className='text-gray-200'>Requires security expertise for report interpretation</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">×</span>
                <span className='text-gray-200'>Time-consuming testing process</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900  p-6 rounded-lg shadow mb-12">
          <h2 className="text-2xl font-bold text-red-900 mb-6">Other Testing Approaches</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              'SAST',
              'MAST',
              'IAST',
              'Pen-testing'
            ].map((tool) => (
              <div key={tool} className="bg-gray-50 p-4 rounded text-center">
                <p className="font-medium text-red-900">{tool}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900  p-6 rounded-lg shadow mb-12">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Popular DAST Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              'Burp Pro Scanner',
              'OWASP ZAP',
              'OpenText Fortify',
              'Acunetix',
              'Jit'
            ].map((tool) => (
              <div key={tool} className="bg-gray-50 p-4 rounded text-center">
                <p className="font-medium text-purple-900">{tool}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-12">
          <div className="flex">
            <AlertTriangle className="h-6 w-6 text-yellow-400 mr-2" />
            <div>
              <p className="text-sm text-yellow-700">
                <strong>Important Note:</strong> No automated vulnerability scanner will catch every bug. Human creativity and expertise remain essential in security testing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};