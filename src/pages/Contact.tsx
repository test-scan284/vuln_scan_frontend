import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Mail, Phone, MapPin} from 'lucide-react';

import ContactUs from '../components/ContactUs';

export const Contact: React.FC = () => {

  return (
    <MainLayout>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-fuchsia-500 via-cyan-400 to-green-400 animate-pulse z-10"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-green-400 via-cyan-400 to-fuchsia-500 animate-pulse z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-200">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-500">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-400">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-gray-600">contact@vulnscan.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-500">Phone</h3>
                  <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-500">Office</h3>
                  <p className="mt-1 text-gray-600">
                    123 Security Street<br />
                    Cyber City, CS 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
            <ContactUs/>
        </div>
      </div>
    </MainLayout>
  );
};