/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { AlertTriangle, Shield, BarChart2, Bug } from 'lucide-react';
import ScanDast from '../components/ScanDast';

interface Vulnerability {
  type: string;
  count: number;
  severity: string;
  top_endpoints: string[];
}

interface ScanStatistics {
  totalEndpoints: number;
  totalVulnerabilities: number;
  scanDuration: string;
  subdomains: number;
  openPorts: string[];
  domain: string;
  timestamp: string;
}

interface ScanResults {
  vulnerabilities: { critical: number; high: number; medium: number; low: number };
  vulnerabilityTypes: { [key: string]: number };
  statistics: ScanStatistics;
  vulnerabilitiesDetails: Vulnerability[];
  zeroVulnerabilities: string[];
}

export const DAST: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setError(null);
    const startTime = Date.now();

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `http://${formattedUrl}`;
    }

    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/i;
    if (!urlPattern.test(formattedUrl)) {
      setError('Please enter a valid URL (e.g., vulnweb.com or http://vulnweb.com)');
      setIsScanning(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:3000/url/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formattedUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Scan request failed: ${response.status}`);
      }

      const data = await response.json();

      // Filter out Static vulnerabilities
      const filteredVulns = data.summary.vulnerabilities.filter(
        (v: any) => v.type.toLowerCase() !== 'static'
      );

      // Calculate scan duration
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      const scanDuration = `${minutes}m ${seconds}s`;

      setScanResults({
        vulnerabilities: {
          critical: filteredVulns.filter((v: { severity: string; }) => v.severity === 'Critical').reduce((a: any, b: { count: any; }) => a + b.count, 0),
          high: filteredVulns.filter((v: { severity: string; }) => v.severity === 'High').reduce((a: any, b: { count: any; }) => a + b.count, 0),
          medium: filteredVulns.filter((v: { severity: string; }) => v.severity === 'Medium').reduce((a: any, b: { count: any; }) => a + b.count, 0),
          low: 0
        },
        vulnerabilityTypes: filteredVulns.reduce((acc: any, v: { type: any; count: any; }) => ({ ...acc, [v.type]: v.count }), {
          'Cross-Site Scripting (XSS)': 0,
          'SQL Injection': 0,
          'Command Injection': 0,
          'File Inclusion': 0,
          'Information Disclosure': 0,
          'Cross-Site Request Forgery': 0,
          'Server Misconfiguration': 0,
          'Authentication Bypass': 0,
          'Sensitive Data': 0,
          'SSTI': 0,
          'XSS': 0,
        }),
        statistics: {
          totalEndpoints: data.summary.urls_with_params + data.summary.urls_without_params,
          totalVulnerabilities: filteredVulns.reduce((a: any, b: { count: any; }) => a + b.count, 0),
          scanDuration,
          subdomains: data.reconnaissance.subdomains,
          openPorts: data.reconnaissance.open_ports,
          domain: data.summary.domain,
          timestamp: data.summary.timestamp
        },
        vulnerabilitiesDetails: filteredVulns,
        zeroVulnerabilities: data.summary.zero_vulnerabilities
      });

    } catch (err: any) {
      setError(err.message || 'An error occurred during scanning. Please ensure the backend is running and try again.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <MainLayout>
      <div className="pointer-events-none">
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-fuchsia-500 via-cyan-400 to-green-400 animate-pulse z-10"></div>
        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-green-400 via-cyan-400 to-fuchsia-500 animate-pulse z-10"></div>
      </div>
      <div className="relative px-4 md:px-16 py-12 text-white bg-black min-h-screen overflow-hidden">
        <div className="space-y-12">
          {/* Title Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-widest neon-glow">DAST - Dynamic Application Security Testing</h1>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">Get dynamic security analysis for your application and discover vulnerabilities in real-time</p>
          </div>

          {/* Scan Form */}
          <div
            className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-cyan-500 shadow-xl p-6 backdrop-blur-md transform transition-all duration-1000 ${
              open ? 'translate-x-0 scale-100 opacity-100' : '-translate-x-full scale-50 opacity-0'
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-cyan-400 typing-effect">Start Security Scan</h2>
            <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4">
              <ScanDast url={url} setUrl={setUrl} isScanning={isScanning} setIsScanning={setIsScanning} />
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center py-12 text-red-500">
              <p>{error}</p>
            </div>
          )}

          {/* Loading Animation */}
          {isScanning && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-fuchsia-500 border-t-transparent mx-auto mb-6"></div>
              <p className="text-cyan-300">Scanning URL for vulnerabilities...</p>
            </div>
          )}

          {/* Scan Results */}
          {scanResults && (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-cyan-400">Scan Results: {scanResults.statistics.domain}</h2>
                <p className="text-gray-400">Timestamp: {new Date(scanResults.statistics.timestamp).toLocaleString()}</p>
              </div>

              {/* Statistics Card with Open Ports */}
              <div className="bg-gray-900 border border-purple-500 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4 text-purple-400">
                  <BarChart2 className="h-6 w-6 mr-2" />
                  <h2 className="text-lg font-semibold">Scan Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Scan Duration</div>
                    <div className="text-2xl font-bold text-purple-300">
                      {scanResults.statistics.scanDuration}
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Scanned Endpoints</div>
                    <div className="text-2xl font-bold text-purple-300">
                      {scanResults.statistics.totalEndpoints}
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Total Vulnerabilities</div>
                    <div className="text-2xl font-bold text-purple-300">
                      {scanResults.statistics.totalVulnerabilities}
                    </div>
                  </div>
                </div>

                {/* Open Ports Section */}
                <div className="mt-6">
                  <div className="text-sm text-gray-400 mb-2">Open Ports:</div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    {scanResults.statistics.openPorts.length > 0 ? (
                      <ul className="space-y-2">
                        {scanResults.statistics.openPorts.map((port, index) => {
                          const [portNumber, service] = port.split(':').map(item => item.trim());
                          return (
                            <li key={index} className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                              <span className="font-mono">
                                <span className="text-purple-300">Port {portNumber}:</span> 
                                <span className="text-gray-300 ml-1">{service}</span>
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <div className="text-gray-500">No open ports found</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Vulnerabilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Severity Card */}
                <div className="bg-gray-900 border border-red-500 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4 text-red-400">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    <h2 className="text-lg font-semibold">Vulnerability Severity</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-red-500">
                        {scanResults.vulnerabilities.critical}
                      </div>
                      <div className="text-gray-400 mt-2">Critical</div>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-orange-400">
                        {scanResults.vulnerabilities.high}
                      </div>
                      <div className="text-gray-400 mt-2">High</div>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-400">
                        {scanResults.vulnerabilities.medium}
                      </div>
                      <div className="text-gray-400 mt-2">Medium</div>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-green-400">
                        {scanResults.vulnerabilities.low}
                      </div>
                      <div className="text-gray-400 mt-2">Low</div>
                    </div>
                  </div>
                </div>

                {/* Types Card */}
                <div className="bg-gray-900 border border-blue-500 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4 text-blue-400">
                    <Bug className="h-6 w-6 mr-2" />
                    <h2 className="text-lg font-semibold">Vulnerability Types</h2>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    {Object.entries(scanResults.vulnerabilityTypes)
                      .filter(([_, count]) => count > 0)
                      .map(([type, count]) => (
                        <div key={type} className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="text-white">{type}</span>
                              <span className="font-bold text-blue-300">{count}</span>
                            </div>
                            <div className="w-full bg-gray-700 h-2 mt-1 rounded-full">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${(count / scanResults.statistics.totalVulnerabilities) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Zero Vulnerabilities */}
              {scanResults.zeroVulnerabilities.length > 0 && (
                <div className="bg-gray-900 border border-teal-500 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4 text-teal-400">
                    <Shield className="h-6 w-6 mr-2" />
                    <h2 className="text-lg font-semibold">Secure Vulnerability Types</h2>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">Vulnerability types not found in the application</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {scanResults.zeroVulnerabilities.map((zeroVuln, index) => (
                      <span key={index} className="bg-teal-900 text-teal-300 px-3 py-1 rounded-full text-sm">
                        {zeroVuln}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Affected Endpoints */}
              <div className="bg-gray-900 border border-green-500 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4 text-green-400">
                  <Shield className="h-6 w-6 mr-2" />
                  <h2 className="text-lg font-semibold">Affected Endpoints</h2>
                </div>
                
                <div className="mt-6 space-y-6">
                  {scanResults.vulnerabilitiesDetails.length > 0 ? (
                    scanResults.vulnerabilitiesDetails.map((vuln, index) => (
                      <div key={index} className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-lg text-white">
                            {vuln.type}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            vuln.severity === 'Critical' ? 'bg-red-900 text-red-300' :
                            vuln.severity === 'High' ? 'bg-orange-900 text-orange-300' :
                            'bg-yellow-900 text-yellow-300'
                          }`}>
                            {vuln.severity}
                          </span>
                        </div>
                        
                        <div className="mt-3 space-y-2">
                          {vuln.top_endpoints.slice(0, 3).map((endpoint, i) => (
                            <div key={i} className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              <span className="text-gray-300 text-sm">{endpoint}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No security vulnerabilities detected
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};