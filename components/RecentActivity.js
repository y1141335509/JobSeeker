function RecentActivity() {
  try {
    const activities = [
      {
        type: 'application',
        company: 'TechCorp Inc.',
        position: 'Frontend Developer',
        time: '2 hours ago',
        status: 'submitted',
        icon: 'send'
      },
      {
        type: 'interview',
        company: 'StartupXYZ',
        position: 'Product Manager',
        time: '1 day ago',
        status: 'scheduled',
        icon: 'calendar'
      },
      {
        type: 'response',
        company: 'DesignHub',
        position: 'UX Designer',
        time: '2 days ago',
        status: 'positive',
        icon: 'mail'
      },
      {
        type: 'application',
        company: 'DataFlow Solutions',
        position: 'Data Analyst',
        time: '3 days ago',
        status: 'submitted',
        icon: 'send'
      }
    ];

    const getStatusColor = (status) => {
      switch (status) {
        case 'positive': return 'text-green-600 bg-green-100';
        case 'scheduled': return 'text-blue-600 bg-blue-100';
        case 'submitted': return 'text-gray-600 bg-gray-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    };

    const getStatusText = (status, type) => {
      if (type === 'interview') return 'Interview scheduled';
      if (type === 'response' && status === 'positive') return 'Positive response';
      if (type === 'application') return 'Application sent';
      return 'Activity logged';
    };

    return (
      <div className="card" data-name="recent-activity" data-file="components/RecentActivity.js">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <button className="text-[var(--primary-color)] hover:underline">View All</button>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <div className={`icon-${activity.icon} text-gray-600 text-lg`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900 truncate">{activity.company}</h4>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{activity.position}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {getStatusText(activity.status, activity.type)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <div className="icon-lightbulb text-blue-600 text-lg mr-3"></div>
            <div>
              <h4 className="font-medium text-blue-900">Keep the momentum going!</h4>
              <p className="text-sm text-blue-700">You've been active this week. Consider following up on pending applications.</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('RecentActivity component error:', error);
    return null;
  }
}