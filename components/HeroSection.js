function HeroSection() {
  try {
    const [currentQuote, setCurrentQuote] = React.useState(0);
    
    const inspiringQuotes = [
      "Your next opportunity is waiting to be discovered",
      "Every application brings you closer to your dream job",
      "The stars align when preparation meets opportunity"
    ];

    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentQuote(prev => (prev + 1) % inspiringQuotes.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }, []);

    return (
      <section className="relative py-20 px-4" data-name="hero-section" data-file="components/HeroSection.js">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your <span className="text-gradient">Perfect Career</span>
              <br />
              with Guidance & Hope
            </h1>
            
            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto">
              Discover meaningful job opportunities while receiving emotional support through personalized astrology and tarot guidance. 
              Build your future with confidence and cosmic wisdom.
            </p>

            <div className="h-12 mb-8 flex items-center justify-center">
              <p className="text-lg text-[var(--accent-color)] font-medium italic transition-opacity duration-1000">
                "{inspiringQuotes[currentQuote]}"
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={() => window.location.href = 'auth.html'} className="btn-primary text-lg px-8 py-4">
              Start Your Journey
            </button>
            <button onClick={() => window.location.href = 'jobs.html'} className="btn-secondary text-lg px-8 py-4">
              Browse Jobs
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <div className="icon-search text-white text-2xl"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Job Matching</h3>
              <p className="text-[var(--text-secondary)]">AI-powered recommendations based on your skills and aspirations</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <div className="icon-sparkles text-white text-2xl"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mystical Guidance</h3>
              <p className="text-[var(--text-secondary)]">Daily horoscopes and tarot insights for career clarity</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4">
                <div className="icon-heart text-white text-2xl"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Emotional Support</h3>
              <p className="text-[var(--text-secondary)]">Community encouragement and progress celebration</p>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('HeroSection component error:', error);
    return null;
  }
}