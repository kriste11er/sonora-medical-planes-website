"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Area */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent"
            >
              Sonora Medical Delivery Planes
            </Link>
            
            {/* Primary Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link 
                href="/" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200"
              >
                Home
              </Link>
              <Link 
                href="/logs" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200"
              >
                About
              </Link>
              <Link 
                href="/team" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200"
              >
                Team
              </Link>
              <Link 
                href="/contact" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button className="hidden lg:flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:text-gray-900 transition-colors">
              <span className="text-sm font-medium">EN</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Donate Button */}
            <a
              href="/donate"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 hover:text-blue-600 hover:border-blue-600 transition-all duration-200 shadow-sm"
            >
              Donate
            </a>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-gray-700 hover:text-gray-900 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Hidden by default */}
      <div className="hidden lg:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            href="/" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            About
          </Link>
          <Link 
            href="/team" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Team
          </Link>
          <Link 
            href="/contact" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};


const CAROUSEL_ITEMS = [
  {
    type: 'image',
    src: '/images/carousel/student-triumph.jpeg',
    alt: 'Student proudly holding completed medical delivery drone',
    caption: 'Building the future of medical delivery in Sonora'
  },
  {
    type: 'video',
    src: '/videos/package-drop.mp4',
    alt: 'Medical package being delivered by drone',
    caption: 'Delivering life-saving supplies to remote communities'
  },
  {
    type: 'image',
    src: '/images/carousel/students-working.jpeg',
    alt: 'Students collaborating on drone assembly',
    caption: 'Club Águilas students learning through hands-on engineering'
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gray-900">
        {/* Carousel implementation */}
        {CAROUSEL_ITEMS.map((item, index) => (
          <div
            key={item.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/30 z-10" />
            {item.type === 'video' ? (
              <video
                src={item.src}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20 bg-gradient-to-t from-black/80">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">{item.caption}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Current Progress Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Current Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-700 mb-2">15</p>
              <p className="text-black">Successful Test Flights</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">8</p>
              <p className="text-gray-600">Students Trained</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">7</p>
              <p className="text-gray-600">Communities Mapped</p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Future Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Service Range</h3>
              <p className="text-gray-600">Each drone will serve communities within a 25km radius</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Population Impact</h3>
              <p className="text-gray-600">Initial planned service area includes 7 communities with 2,100 total population</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Delivery Time</h3>
              <p className="text-gray-600">Potential to reduce medical supply delivery time from 2 days to 15 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">400g</p>
              <p className="text-gray-600">Payload Capacity</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">100</p>
              <p className="text-gray-600">km/hr Flight Speed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">✓</p>
              <p className="text-gray-600">Autonomous Navigation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Educational Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Club Águilas</h3>
              <p className="text-gray-600">7 active student members</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Hands-on Experience</h3>
              <p className="text-gray-600">Over 100 hours of engineering practice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Milestones Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Technical Achievements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Flight of fully 3D printed drone</li>
                <li>Full autopilot orbit with wifi hotspot</li>
                <li>Autonomous waypoint mission</li>
                <li>Precision package drop</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Platform Evolution</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Commercial hobby platform testing</li>
                <li>Small 3D printed airframe</li>
                <li>Custom large airframe development</li>
                <li>Cost-optimized GPS integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Join Our Mission</h2>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><Link href="/logs" className="hover:text-blue-400">Our Story</Link></li>
                <li><Link href="/team" className="hover:text-blue-400">Team</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Partners</h3>
              <ul className="space-y-2">
                <li>MISC Alamos</li>
                <li>Clinica Almas</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="hover:text-blue-400">Email Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Club Águilas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}