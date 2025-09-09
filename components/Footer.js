function Footer() {
  try {
    return (
      <footer className="bg-slate-900 text-white py-12 px-4" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <div className="icon-compass text-white text-lg"></div>
                </div>
                <span className="text-xl font-bold">JobSeer</span>
              </div>
              <p className="text-slate-400">
                Find your perfect career path with guidance from both technology and the cosmos.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Career Tools</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="jobs.html" className="hover:text-white transition-colors">Job Search</a></li>
                <li><a href="resume.html" className="hover:text-white transition-colors">Resume Builder</a></li>
                <li><a href="dashboard.html" className="hover:text-white transition-colors">Progress Tracking</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Guidance</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="guidance.html" className="hover:text-white transition-colors">Daily Horoscope</a></li>
                <li><a href="guidance.html" className="hover:text-white transition-colors">Tarot Insights</a></li>
                <li><a href="community.html" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2025 JobSeer. All rights reserved. Made with ❤️ for job seekers everywhere.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}