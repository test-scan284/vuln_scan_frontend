import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Shield, Target, Code, Star, Users, Award, Zap } from 'lucide-react';
import MissionCard from '../components/MissionCard';

export const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Dr. Hayam Mousa',
      role: 'Lecturer @ Menofia University and the Team LEADER',
      image: 'http://www.menofia.edu.eg/PrtlFiles/Staff/486/Portal/SiteInfo/Image.png',
      description: 'Ph.D. in Computer Science with 10+ years of experience in vulnerability research.',
      link: 'https://dl.acm.org/profile/99658757954/publications?Role=author',
    },
    {
      name: 'Begad Mohammed',
      role: 'Junior Pen-tester',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
      description: 'Undergraduate Student @ Menofia Univ. Specialized in web application security and penetration testin',
      link: 'https://example.com',
    },
    {
      name: 'Karim Samir',
      role: 'SOC Analyst',
      image: 'https://images.unsplash.com/photo-1468218457742-ee484fe2fe4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D',
      description: 'Undergraduate Student @ Menofia Univ. Specialized in web application security and penetration testing.',
      link: 'https://example.com',
    },
    {
      name: 'Abdullah Esmail',
      role: 'Juior Pen-tester',
      image: 'https://media.istockphoto.com/id/1083565832/photo/chinese-man-smiling.jpg?s=612x612&w=0&k=20&c=Y3nWveAzISREv0cLMmpNZe54GH7gysHLL6xUbR9mfsw=',
      description: 'Undergraduate Student @ Menofia Univ. Specialized in web application security and penetration testing.',
      link: 'https://example.com',
    },
    {
      name: 'Karim Ahmed',
      role: 'Security Analyst',
      image: 'https://images.unsplash.com/photo-1530193709238-9c1a060e0ccb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8',
      description: 'Undergraduate Student @ Menofia Univ. Specialized in web application security and penetration testing.',
      link: 'https://example.com',
    },
    {
      name: 'Karim Elsayed',
      role: 'IR Engineer',
      image: 'https://images.unsplash.com/photo-1522724560584-fe4dfa2991f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8',
      description: 'Undergraduate Student @ Menofia Univ. Specialized in web application security and penetration testing.',
      link: 'https://example.com',
    },
    {
      name: 'Mohammed Elbahar',
      role: 'Junior Pen-tester',
      image: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D=',
      description: 'Undergraduate Student @ Menofia Univ. Specialized in web application security and penetration testing.',
      link: 'https://example.com',
    },
    {
      name: 'Abelrahman Zakaria',
      role: 'El-Jokeer',
      image: 'https://media.istockphoto.com/id/1446248196/photo/portrait-of-a-businessman-in-the-city.jpg?s=612x612&w=0&k=20&c=-kTl1ZZ9FXxClWMISYEiWFUIDfDwurJi_aEG2iWt-Hk=',
      description: 'Undergraduate Student @ Menofia Univ. Specialized in web application security and penetration testing.',
      link: 'https://example.com',
    },
  ];

  const testimonials = [
    {
      name: 'John Smith',
      role: 'CTO at TechCorp',
      content: 'VulnScan has transformed our security testing process. The combination of DAST and SAST capabilities is incredibly powerful.',
      rating: 5,
    },
    {
      name: 'Lisa Johnson',
      role: 'Security Lead at SecureNet',
      content: 'The automated scanning features have saved us countless hours. The detailed reports help us prioritize and fix vulnerabilities efficiently.',
      rating: 5,
    },
    {
      name: 'David Wilson',
      role: 'DevOps Engineer at CloudTech',
      content: 'Integration was seamless, and the results are consistently reliable. A must-have tool for any security-conscious team.',
      rating: 4,
    },
  ];
  const features = [
    {
      icon: <Shield className="w-10 h-10 text-cyan-400" />,
      title: 'Comprehensive Security',
      description: 'Combined DAST and SAST analysis',
      color: 'hover:bg-cyan-800/30',
    },
    {
      icon: <Zap className="w-10 h-10 text-purple-400" />,
      title: 'Fast Scanning',
      description: 'Quick and efficient vulnerability detection',
      color: 'hover:bg-purple-800/30',
    },
    {
      icon: <Award className="w-10 h-10 text-green-400" />,
      title: 'Accurate Results',
      description: 'Minimal false positives',
      color: 'hover:bg-green-800/30',
    },
    {
      icon: <Code className="w-10 h-10 text-pink-400" />,
      title: 'Easy Integration',
      description: 'Seamless workflow integration',
      color: 'hover:bg-pink-800/30',
    },
  ];
  
  
  return (
    <MainLayout>
      
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-200 sm:text-5xl">
            Securing the Digital World
          </h1>
          <p className="mt-6 text-xl text-gray-400">
            VulnScan combines cutting-edge security analysis with ease of use to help organizations protect their applications from vulnerabilities.
          </p>
        </div>

        {/* Mission Section */}
        <div className=" rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12">
            <div className="text-center mb-12">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-200">Our Mission</h2>
            </div>
            <MissionCard/>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Protection</h3>
                <p className="text-gray-600">Safeguarding applications against evolving security threats</p>
              </div>
              <div className="text-center">
                <Code className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">Advancing security testing through cutting-edge technology</p>
              </div>
              <div className="text-center">
                <Lock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Trust</h3>
                <p className="text-gray-600">Building confidence in application security</p>
              </div>
            </div> */}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-200">Meet Our Team</h2>
            <p className="mt-4 text-xl text-gray-400">
              Experts dedicated to advancing application security
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-lg border border-white/20 text-white transition duration-300 transform hover:scale-105 hover:bg-white/20"
                >
                  <a href={member.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  </a>
                  <div className="p-4">
                    <a href={member.link} target="_blank" rel="noopener noreferrer">
                      <h3 className="text-xl font-semibold text-white hover:underline">{member.name}</h3>
                    </a>
                    <p className="text-blue-500 mb-4">{member.role}</p>
                    <p className="text-gray-300">{member.description}</p>
                  </div>
                </div>
              ))}
           </div>

        </div>

        {/* Features Section */}
        <div className=" rounded-2xl p-8">
          <div className="text-center mb-12">
            <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-200">Why Choose VulnScan?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 transition duration-300 transform hover:scale-105 shadow-lg 
                ${feature.color} text-white bg-gradient-to-br from-white/5 to-white/10 border border-white/10`}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-center">{feature.title}</h3>
                <p className="text-sm text-gray-300 mt-2 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <div className="text-center mb-12">
            <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-200">What Our Users Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 shadow-xl backdrop-blur-md bg-white/5 border border-white/10 text-white transition duration-300 transform hover:scale-105 hover:bg-white/10"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">{testimonial.content}</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </MainLayout>
  );
};