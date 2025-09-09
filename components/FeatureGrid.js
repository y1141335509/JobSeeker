function FeatureGrid() {
  try {
    const features = [
      {
        icon: 'briefcase',
        title: 'Resume Builder',
        description: 'AI-assisted resume creation with industry-specific templates and optimization tips',
        category: 'career'
      },
      {
        icon: 'target',
        title: 'Job Matching',
        description: 'Semantic search technology finds opportunities that align with your skills and goals',
        category: 'career'
      },
      {
        icon: 'chart-bar',
        title: 'Progress Tracking',
        description: 'Monitor applications, interviews, and outcomes with detailed analytics',
        category: 'career'
      },
      {
        icon: 'moon',
        title: 'Daily Horoscope',
        description: 'Career-focused astrological guidance to navigate your professional journey',
        category: 'mystical'
      },
      {
        icon: 'sparkles',
        title: 'Tarot Insights',
        description: 'Weekly career tarot draws for clarity and motivation during job searches',
        category: 'mystical'
      },
      {
        icon: 'users',
        title: 'Community Support',
        description: 'Connect with fellow job seekers, share wins, and get encouragement',
        category: 'support'
      }
    ];

    return (
      <section id="features" className="py-20 px-4 bg-white" data-name="feature-grid" data-file="components/FeatureGrid.js">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Combine practical career tools with emotional support to transform your job search experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`${feature.category === 'mystical' ? 'mystical-card' : 'card'} hover:shadow-lg transition-shadow`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  feature.category === 'mystical' 
                    ? 'bg-purple-100' 
                    : feature.category === 'support' 
                    ? 'bg-green-100' 
                    : 'bg-blue-100'
                }`}>
                  <div className={`icon-${feature.icon} text-xl ${
                    feature.category === 'mystical' 
                      ? 'text-purple-600' 
                      : feature.category === 'support' 
                      ? 'text-green-600' 
                      : 'text-blue-600'
                  }`}></div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[var(--text-secondary)]">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Career Journey?</h3>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              Join thousands who have found their dream jobs with guidance and support
            </p>
            <button onClick={() => window.location.href = 'auth.html'} className="btn-primary text-lg px-8 py-4">
              Start Free Today
            </button>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('FeatureGrid component error:', error);
    return null;
  }
}