function DailyGuidance() {
  try {
    const [activeTab, setActiveTab] = React.useState('horoscope');
    
    const horoscope = {
      sign: 'Capricorn',
      message: 'Today brings opportunities for career advancement. Your natural leadership qualities will shine in meetings. Trust your instincts when evaluating new job prospects.',
      lucky: 'Networking events'
    };

    const tarot = {
      card: 'The Star',
      meaning: 'Hope and inspiration guide your career path. A new opportunity will present itself within the next few days. Stay open to unexpected possibilities.',
      advice: 'Network with confidence'
    };

    const affirmations = [
      "I am worthy of my dream job",
      "Every rejection brings me closer to the right opportunity",
      "My skills and experience have value",
      "I trust the process of my career journey"
    ];

    return (
      <div className="space-y-6" data-name="daily-guidance" data-file="components/DailyGuidance.js">
        <div className="mystical-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Daily Guidance</h2>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="icon-sparkles text-purple-600 text-lg"></div>
            </div>
          </div>
          
          <div className="flex border-b border-purple-200 mb-4">
            <button
              onClick={() => setActiveTab('horoscope')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'horoscope' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-purple-600'
              }`}
            >
              Horoscope
            </button>
            <button
              onClick={() => setActiveTab('tarot')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'tarot' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-purple-600'
              }`}
            >
              Tarot
            </button>
          </div>

          {activeTab === 'horoscope' && (
            <div>
              <div className="flex items-center mb-3">
                <div className="icon-moon text-purple-600 text-lg mr-2"></div>
                <span className="font-semibold">{horoscope.sign}</span>
              </div>
              <p className="text-gray-700 mb-3">{horoscope.message}</p>
              <div className="bg-purple-50 rounded-lg p-3">
                <span className="text-sm font-medium text-purple-700">Lucky Focus: </span>
                <span className="text-sm text-purple-600">{horoscope.lucky}</span>
              </div>
            </div>
          )}

          {activeTab === 'tarot' && (
            <div>
              <div className="flex items-center mb-3">
                <div className="icon-sparkles text-purple-600 text-lg mr-2"></div>
                <span className="font-semibold">{tarot.card}</span>
              </div>
              <p className="text-gray-700 mb-3">{tarot.meaning}</p>
              <div className="bg-purple-50 rounded-lg p-3">
                <span className="text-sm font-medium text-purple-700">Career Advice: </span>
                <span className="text-sm text-purple-600">{tarot.advice}</span>
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="font-semibold mb-3">Today's Affirmation</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-gray-700 italic">"{affirmations[0]}"</p>
          </div>
          <button className="text-sm text-[var(--primary-color)] hover:underline mt-2">
            Get new affirmation
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DailyGuidance component error:', error);
    return null;
  }
}
