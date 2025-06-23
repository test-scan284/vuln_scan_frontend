import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart, TooltipItem } from 'chart.js/auto';

const SolutionsDropdown: React.FC = () => (
  <div className="dropdown-content">
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-gray-800 p-4 rounded border border-cyan-600">
        <h3 className="text-lg font-semibold text-cyan-400">DAST Analysis</h3>
        <p className="text-sm text-gray-300 mt-1">Dynamic testing for real-time vulnerability detection.</p>
      </div>
      <div className="bg-gray-800 p-4 rounded border border-cyan-600">
        <h3 className="text-lg font-semibold text-cyan-400">SAST Analysis</h3>
        <p className="text-sm text-gray-300 mt-1">Static code analysis to detect vulnerabilities early.</p>
      </div>
    </div>
  </div>
);

const ResourcesDropdown: React.FC = () => (
  <div className="dropdown-content">
    <div>
      <h3 className="text-lg font-semibold text-cyan-400 mb-2">Security Resources</h3>
      <ul className="text-gray-300 space-y-2 text-sm">
        <li>
          <a
            href="https://www.geeksforgeeks.org/software-engineering/difference-between-sast-and-dast/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 block"
          >
            DAST vs SAST Comparison
          </a>
        </li>
        <li>
          <a
            href="https://www.connectwise.com/blog/common-threats-and-attacks"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 block"
          >
            Top 10 Security Threats
          </a>
        </li>
        <li>
          <a
            href="https://www.geeksforgeeks.org/software-engineering/software-development-life-cycle-sdlc/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 block"
          >
            SDLC Integration Guide
          </a>
        </li>
      </ul>
    </div>
  </div>
);

const ContactDropdown: React.FC = () => (
  <div className="contact-dropdown">
    <div className="space-y-2">
      <div>
        <p className="text-cyan-400 text-sm font-medium">Email:</p>
        <p className="text-gray-300 text-sm">support@vulnscan.com</p>
      </div>
      <div>
        <p className="text-cyan-400 text-sm font-medium">Phone:</p>
        <p className="text-gray-300 text-sm">+20 1019679459</p>
      </div>
    </div>
  </div>);

const Header: React.FC = () => {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState<boolean>(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  const closeAllDropdowns = () => {
    setIsSolutionsOpen(false);
    setIsResourcesOpen(false);
    setIsContactOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown-container')) {
        closeAllDropdowns();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="bg-black text-white p-4 border-b border-gray-700 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <span className="text-cyan-400 text-xl font-bold">VulnScan</span>
        <nav className="flex items-center space-x-6">
          <div className="dropdown-container">
            <button
              className="text-gray-300 hover:text-cyan-400 flex items-center"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsSolutionsOpen(!isSolutionsOpen);
                setIsResourcesOpen(false);
                setIsContactOpen(false);
              }}
            >
              Solutions
              <span className={`arrow ${isSolutionsOpen ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            {isSolutionsOpen && <SolutionsDropdown />}
          </div>
          <div className="dropdown-container">
            <button
              className="text-gray-300 hover:text-cyan-400 flex items-center"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsResourcesOpen(!isResourcesOpen);
                setIsSolutionsOpen(false);
                setIsContactOpen(false);
              }}
            >
              Resources
              <span className={`arrow ${isResourcesOpen ? 'arrow-up' : 'arrow-down'}`}></span>
            </button>
            {isResourcesOpen && <ResourcesDropdown />}
          </div>
          <div className="dropdown-container">
            <button
              className="text-gray-300 hover:text-cyan-400"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsContactOpen(!isContactOpen);
                setIsSolutionsOpen(false);
                setIsResourcesOpen(false);
              }}
            >
              Contact
            </button>
            {isContactOpen && <ContactDropdown />}
          </div>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/login" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
          Log in
        </Link>
        <Link to="/signup" className="bg-cyan-500 text-black font-semibold px-4 py-2 rounded hover:bg-cyan-600">
          Sign up
        </Link>
      </div>
    </header>
  );
};

const MainSection: React.FC = () => (
  <section className="max-w-4xl mx-auto py-10 px-4">
    <h1 className="text-4xl font-bold text-white mb-4">VulnScan Security Solutions</h1>
    <p className="text-lg text-gray-400 mb-6">
      Comprehensive DAST and SAST security testing for modern applications.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800 p-6 rounded border border-cyan-600">
        <h3 className="text-xl font-semibold text-cyan-400">DAST Analysis</h3>
        <p className="text-gray-300 mt-2">Dynamic Application Security Testing for real-time vulnerability detection.</p>
      </div>
      <div className="bg-gray-800 p-6 rounded border border-cyan-600">
        <h3 className="text-xl font-semibold text-cyan-400">SAST Analysis</h3>
        <p className="text-gray-300 mt-2">Static Application Security Testing for code-level vulnerability detection.</p>
      </div>
    </div>
    <div className="mt-6">
      <Link to="/signup" className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600">
        Get Started
      </Link>
    </div>
  </section>
);

const KeyFeaturesSection: React.FC = () => (
  <section className="max-w-4xl mx-auto py-10 px-4">
    <h2 className="text-3xl font-bold text-white mb-6">Key Features of VulnScan</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 p-4 rounded border border-cyan-600">
        <h3 className="text-lg font-semibold text-cyan-400">Automated Scanning</h3>
        <p className="text-gray-300 text-sm mt-2">Run automated DAST and SAST scans with minimal setup.</p>
      </div>
      <div className="bg-gray-800 p-4 rounded border border-cyan-600">
        <h3 className="text-lg font-semibold text-cyan-400">Detailed Reports</h3>
        <p className="text-gray-300 text-sm mt-2">Get actionable insights with comprehensive vulnerability reports.</p>
      </div>
      <div className="bg-gray-800 p-4 rounded border border-cyan-600">
        <h3 className="text-lg font-semibold text-cyan-400">Multi-Platform Support</h3>
        <p className="text-gray-300 text-sm mt-2">Secure web, mobile, and cloud applications seamlessly.</p>
      </div>
    </div>
    {/* <div className="mt-6">
      <button className="bg-cyan-500 text-black font-semibold px-6 py-3 rounded hover:bg-cyan-600">Explore Features</button>
    </div> */}
  </section>
);

const SecurityStatsSection: React.FC = () => {
  useEffect(() => {
    const pieCtx = (document.getElementById('pieChart') as HTMLCanvasElement)?.getContext('2d');
    if (pieCtx) {
      const pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['Apps with Vulnerabilities', 'Apps without Vulnerabilities'],
          datasets: [
            {
              data: [78, 22],
              backgroundColor: ['#06b6d4', '#4b5563'],
              borderColor: ['#0e7490', '#374151'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: { color: '#ffffff' },
            },
          },
        },
      });

      return () => pieChart.destroy();
    }
  }, []);

  useEffect(() => {
    const barCtx = (document.getElementById('barChart') as HTMLCanvasElement)?.getContext('2d');
    if (barCtx) {
      const barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['Vulnerable Apps', 'Fix Time', 'Breach Cost'],
          datasets: [
            {
              label: 'Security Metrics',
              data: [78, 63, 3.9],
              backgroundColor: ['#06b6d4', '#f97316', '#ef4444'],
              borderColor: ['#0e7490', '#ea580c', '#dc2626'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: '#ffffff' },
              grid: { color: '#374151' },
            },
            x: {
              ticks: { color: '#ffffff' },
              grid: { color: '#374151' },
            },
          },
          plugins: {
            legend: {
              labels: { color: '#ffffff' },
            },
            tooltip: {
              callbacks: {
                label: (context: TooltipItem<'bar'>) => {
                  const label = context.label;
                  const value = context.raw as number;
                  if (label === 'Vulnerable Apps') return `${value}%`;
                  if (label === 'Fix Time') return `${value} Days`;
                  if (label === 'Breach Cost') return `$${value}M`;
                  return value.toString();
                },
              },
            },
          },
        },
      });

      return () => barChart.destroy();
    }
  }, []);

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-white mb-6">Security by the Numbers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded border border-cyan-600">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Vulnerability Distribution</h3>
          <canvas id="pieChart" width="200" height="200"></canvas>
          <p className="text-gray-300 text-sm mt-2 text-center">78% of applications have at least one vulnerability.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded border border-cyan-600">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Security Metrics</h3>
          <canvas id="barChart" width="200" height="200"></canvas>
          <p className="text-gray-300 text-sm mt-2 text-center">Key metrics: Vulnerable apps (%), Fix time (days), Breach cost ($M).</p>
        </div>
      </div>
    </section>
  );
};

const LandingPage: React.FC = () => (
  <>
    <style>
      {`
        body {
          background-color: #0f0f0f;
          color: #ffffff;
          font-family: sans-serif;
        }
        .dropdown-container {
          position: relative;
          display: inline-block;
        }
        .dropdown-content {
          position: absolute;
          top: 100%;
          left: 0;
          width: 400px;
          max-height: 50vh;
          background-color: #1f2937;
          border: 1px solid #0e7490;
          border-radius: 0 0 8px 8px;
          z-index: 50;
          overflow-y: auto;
          padding: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .arrow {
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 0.5rem;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #ffffff;
          transition: transform 0.3s ease;
        }
        .arrow-up {
          transform: rotate(180deg);
        }
        .arrow-down {
          transform: rotate(0deg);
        }
        .contact-dropdown {
          position: absolute;
          left: 0;
          top: 100%;
          background-color: #1f2937;
          border: 1px solid #0e7490;
          border-radius: 0.5rem;
          z-index: 50;
          padding: 1rem;
          min-width: 250px;
        }
      `}
    </style>
    <div>
      <Header />
      <MainSection />
      <KeyFeaturesSection />
      <SecurityStatsSection />
    </div>
  </>
);

export default LandingPage;