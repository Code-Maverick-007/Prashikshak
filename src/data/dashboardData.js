// This file holds the static data for the dashboard page.

export const dashboardStats = [
  {
    title: 'Total Internships',
    value: '120',
    change: '+12%',
    icon: 'Briefcase', // We'll map this string to an icon in the component
    color: 'blue',
  },
  {
    title: 'Total Applicants',
    value: '1,234',
    change: '+8.5%',
    icon: 'Users',
    color: 'green',
  },
  {
    title: 'Active MoUs',
    value: '45',
    change: '+5',
    icon: 'FileText',
    color: 'purple',
  },
  {
    title: 'Colleges Onboarded',
    value: '89',
    change: '+2',
    icon: 'Building2',
    color: 'yellow',
  },
];

export const recentActivities = [
    {
        user: 'Admin',
        action: 'Added a new internship for "Software Engineering".',
        time: '2 hours ago',
    },
    {
        user: 'Dr. Aarav Sharma',
        action: 'Approved 5 student applications for Vidya Mandir College.',
        time: '5 hours ago',
    },
    {
        user: 'System',
        action: 'Generated the monthly analytics report.',
        time: 'Yesterday',
    },
];