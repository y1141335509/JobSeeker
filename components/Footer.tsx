'use client';

import React from 'react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Career Tools',
      links: [
        { label: 'Job Search', href: '/jobs' },
        { label: 'Resume Builder', href: '/resume' },
        { label: 'Progress Tracking', href: '/dashboard' },
      ],
    },
    {
      title: 'Guidance',
      links: [
        { label: 'Daily Horoscope', href: '/guidance' },
        { label: 'Tarot Insights', href: '/guidance' },
        { label: 'Community', href: '/community' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
      ],
    },
  ];

  const handleLinkClick = (href: string) => {
    // This will be replaced with proper Next.js navigation
    window.location.href = href;
  };

  return (
    <footer className="bg-slate-900 text-white py-12 px-4" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="icon-compass text-white text-lg" />
              </div>
              <span className="text-xl font-bold">JobSeer</span>
            </div>
            <p className="text-slate-400">
              Find your perfect career path with guidance from both technology and the cosmos.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-slate-400">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="hover:text-white transition-colors text-left"
                      data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
          <p>&copy; 2025 JobSeer. All rights reserved. Made with ❤️ for job seekers everywhere.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;