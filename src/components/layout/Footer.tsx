import React from 'react';
import { Shield, Github, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-300">VulnScan</span>
            </div>
            <p className="mt-4 text-gray-400 max-w-md">
              Comprehensive security analysis platform providing both dynamic and static application security testing to protect your applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/home" className="text-gray-400 hover:text-yellow-400">Home</Link>
              </li>
              <li>
                <Link to="/dast" className="text-gray-400 hover:text-yellow-400">DAST Scanner</Link>
              </li>
              <li>
                <Link to="/sast" className="text-gray-400 hover:text-yellow-400">SAST Scanner</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-yellow-400">About</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="https://github.com" className="text-gray-300 hover:text-yellow-400 flex items-center">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-gray-300 hover:text-yellow-400 flex items-center">
                  <Twitter className="h-5 w-5 mr-2" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="mailto:contact@vulnscan.com" className="text-gray-300 hover:text-yellow-400 flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} VulnScan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};