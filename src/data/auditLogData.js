// src/data/auditLogData.js

export const logs = [
  {
    action: 'User Login',
    user: 'admin@nep.gov.in',
    details: 'Successful login from IP 192.168.1.100',
    timestamp: '2024-10-11 14:32:15',
    type: 'auth',
  },
  {
    action: 'Data Updated',
    user: 'coordinator@college.edu',
    details: 'Updated college information - Vidya Mandir College',
    timestamp: '2024-10-11 13:45:22',
    type: 'update',
  },
  {
    action: 'Submission Record',
    user: 'student@example.com',
    details: 'Internship report submitted - Data Analytics',
    timestamp: '2024-10-11 12:18:40',
    type: 'submission',
  },
  {
    action: 'MoU Upload',
    user: 'admin@nep.gov.in',
    details: 'New MoU document uploaded - Tech Innovations Inc.',
    timestamp: '2024-10-11 11:05:33',
    type: 'upload',
  },
  {
    action: 'User Login',
    user: 'partner@company.com',
    details: 'Successful login from IP 192.168.1.105',
    timestamp: '2024-10-11 10:22:11',
    type: 'auth',
  },
  {
    action: 'Data Updated',
    user: 'admin@nep.gov.in',
    details: 'Updated internship details - Software Engineering',
    timestamp: '2024-10-11 09:15:48',
    type: 'update',
  },
];