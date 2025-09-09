function Header() {
  try {
    const navigateToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `index.html#${sectionId}`;
      }
    };

    const navigateToPage = (page) => {
      window.location.href = page;
    };

    return (
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="icon-compass text-white text-xl"></div>
              </div>
              <span className="text-2xl font-bold text-gradient">JobSeer</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => navigateToSection('features')} className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Features
              </button>
              <button onClick={() => navigateToPage('dashboard.html')} className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Dashboard
              </button>
              <button onClick={() => navigateToPage('jobs.html')} className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Job Search
              </button>
              <button onClick={() => navigateToPage('guidance.html')} className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Guidance
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button onClick={() => navigateToPage('auth.html')} className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Sign In
              </button>
              <button onClick={() => navigateToPage('auth.html')} className="btn-primary">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}