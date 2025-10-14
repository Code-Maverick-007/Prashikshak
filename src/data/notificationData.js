// src/data/notificationData.js

export const initialTemplates = [
  {
    id: 1,
    name: 'Internship Deadline Reminder',
    type: 'Reminder',
    channels: ['Email', 'SMS'],
    status: 'Sent', // This can represent the last time it was used
    date: 'Oct 10, 2025',
    content: 'Dear Student, this is a reminder that the deadline for the Software Engineering internship application is approaching. Please submit your application soon.'
  },
  {
    id: 2,
    name: 'MoU Renewal Alert',
    type: 'System',
    channels: ['Email'],
    status: 'Scheduled',
    date: 'Oct 15, 2025',
    content: 'Attention Admin, the Memorandum of Understanding with {Company Name} is due for renewal next month. Please take the necessary action.'
  },
  {
    id: 3,
    name: 'Report Review Pending',
    type: 'Reminder',
    channels: ['Email', 'SMS'],
    status: 'Sent',
    date: 'Oct 08, 2025',
    content: 'Hello Coordinator, you have pending internship reports to review. Please log in to the portal to view and approve them.'
  },
];

export const initialRecentNotifications = [
  { id: 1, title: 'Internship Applications Closed', recipients: 234, time: '2 hours ago' },
  { id: 2, title: 'New MoU Signed with Tech Corp', recipients: 89, time: '5 hours ago' },
  { id: 3, title: 'Quarterly Report Due', recipients: 156, time: '1 day ago' },
];