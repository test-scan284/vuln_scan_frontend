import React, { useState } from 'react';
import { Shield, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showMethodsDropdown, setShowMethodsDropdown] = useState(false);

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/home', label: 'Home' },
    { path: '/dast', label: 'DAST' },
    { path: '/sast', label: 'SAST' },
    { path: '/dashboard', label: 'Dashboard' }, // Added Dashboard link
    {
      label: 'Methods Insights',
      dropdown: true,
      items: [
        { path: '/about-dast', label: 'About DAST' },
        { path: '/about-sast', label: 'About SAST' },
      ],
    },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <nav className="bg-black shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-200">VulnScan</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item, index) => (
                  item.dropdown ? (
                    <div
                      key={index}
                      className="relative inline-flex items-center h-full"
                      onMouseEnter={() => setShowMethodsDropdown(true)}
                      onMouseLeave={() => setShowMethodsDropdown(false)}
                    >
                      <button
                        className={`
                          inline-flex items-center px-1 pt-1 border-b-2 h-full
                          ${showMethodsDropdown ? 'border-blue-500 text-gray-900' : 'border-transparent'}
                          text-sm font-medium text-gray-500 hover:text-gray-200
                          transition-colors duration-200
                        `}
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      {showMethodsDropdown && (
                        <div className="absolute top-full left-0 z-10 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1" role="menu">
                            {item.items.map((dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownIndex}
                                to={dropdownItem.path}
                                className={`
                                  block px-4 py-2 text-sm
                                  ${isActiveRoute(dropdownItem.path) 
                                    ? 'bg-gray-100 text-gray-900' 
                                    : 'text-gray-700 hover:bg-gray-50'
                                  }
                                `}
                                role="menuitem"
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={index}
                      to={item.path || ""}
                      className={`
                        inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
                        ${isActiveRoute(item.path || "")
                          ? 'border-blue-500 text-gray-200'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-200'
                        }
                        transition-colors duration-200
                      `}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};