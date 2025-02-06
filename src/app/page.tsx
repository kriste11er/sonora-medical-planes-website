"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react';

// Configure your carousel media here
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
  },
  {
    type: 'image',
    src: '/images/carousel/launch-ready.jpeg',
    alt: 'Team preparing drone for launch',
    caption: 'Every flight brings vital medical supplies closer to those in need'
  },
  {
    type: 'image',
    src: '/images/carousel/drone-flight.jpeg',
    alt: 'Drone soaring over Sonoran landscape',
    caption: 'Bridging the gap between healthcare and remote mountain communities'
  }
];

const CAROUSEL_INTERVAL = 5000; // 5 seconds between slides

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email signup functionality
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <div className="relative h-[70vh] bg-gray-900">
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
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            We're working with Dr. David and his medical students in Alamos, Sonora, 
            to develop affordable delivery drones that can get urgent medical supplies 
            to remote communities. What currently takes days to reach by mule through 
            mountainous terrain, we're hoping to accomplish in minutes by air.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">25km</h3>
              <p className="text-gray-600">Delivery Range</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">400g</h3>
              <p className="text-gray-600">Payload Capacity</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">5</h3>
              <p className="text-gray-600">Communities Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Support Our Mission</h2>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
              disabled
            >
              <Heart className="w-5 h-5" />
              Donate
            </button>
            <Link
              href="/contact"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center justify-center gap-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Sign up for our newsletter to follow our progress and learn about ways to help.
          </p>
          <form onSubmit={handleEmailSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-blue-400">Our Story</Link></li>
                <li><Link href="/team" className="hover:text-blue-400">Team</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Our Work</h3>
              <ul className="space-y-2">
                <li><Link href="/technology" className="hover:text-blue-400">Technology</Link></li>
                <li><Link href="/impact" className="hover:text-blue-400">Impact</Link></li>
                <li><Link href="/blog" className="hover:text-blue-400">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Get Involved</h3>
              <ul className="space-y-2">
                <li><Link href="/volunteer" className="hover:text-blue-400">Volunteer</Link></li>
                <li><Link href="/partner" className="hover:text-blue-400">Partner With Us</Link></li>
                <li><button disabled className="hover:text-blue-400 opacity-50 cursor-not-allowed">Donate</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="hover:text-blue-400">Email Us</Link></li>
                <li><Link href="https://twitter.com" className="hover:text-blue-400">Twitter</Link></li>
                <li><Link href="https://linkedin.com" className="hover:text-blue-400">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Medical Drone Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}