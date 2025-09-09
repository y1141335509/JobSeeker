function DashboardStats() {
  try {
    const stats = [
      { label: 'Applications Sent', value: '23', trend: '+5 this week', icon: 'send', color: 'blue' },
      { label: 'Interviews Scheduled', value: '4', trend: '+2 this week', icon: 'calendar', color: 'green' },
      { label: 'Profile Views', value: '87', trend: '+12 this week', icon: 'eye', color: 'purple' },
      { label: 'Job Matches', value: '156', trend: '+8 new today', icon: 'target', color: 'orange' }
    ];

    return (
      <div className="card" data-name="dashboard-stats" data-file="components/DashboardStats.js">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Job Search Progress</h2>
          <button className="text-[var(--primary-color)] hover:underline">View Details</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  <div className={`icon-${stat.icon} text-sm ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                  }`}></div>
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-[var(--text-secondary)] mb-1">{stat.label}</div>
              <div className="text-xs text-green-600">{stat.trend}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex space-x-4">
          <button onClick={() => window.location.href = 'jobs.html'} className="btn-primary">
            Find More Jobs
          </button>
          <button onClick={() => window.location.href = 'resume.html'} className="text-[var(--primary-color)] hover:underline">
            Update Resume
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DashboardStats component error:', error);
    return null;
  }
}