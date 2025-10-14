// src/data/supportTicketData.js

export const initialSupportTickets = [
  {
    id: 101,
    user: 'Priya Singh',
    email: 'priya.singh@example.com',
    subject: 'Cannot upload my internship report',
    query: 'Hello, I am trying to upload my final internship report for the Data Analytics internship, but I keep getting an error message. The file is a PDF and it is under the size limit. Can you please assist? Thank you.',
    status: 'Open',
    timestamp: '2025-10-14 10:30:15',
  },
  {
    id: 102,
    user: 'Rohan Kumar',
    email: 'rohan.k@example.com',
    subject: 'Question about MoU Renewal Process',
    query: 'Hi, I am the coordinator for Jnana Jyothi College. Our MoU is expiring soon. What are the steps required to renew it for another year?',
    status: 'Open',
    timestamp: '2025-10-14 09:15:42',
  },
  {
    id: 103,
    user: 'Aisha Khan',
    email: 'aisha.k@example.com',
    subject: 'Login Issue',
    query: 'I am unable to log in to my student account. I tried resetting my password but did not receive an email.',
    status: 'Closed',
    timestamp: '2025-10-13 17:45:20',
  },
  {
    id: 104,
    user: 'Admin Test',
    email: 'test@example.com',
    subject: 'Test Ticket for System Check',
    query: 'This is a test ticket to ensure the support system is working correctly.',
    status: 'In Progress',
    timestamp: '2025-10-12 11:05:33',
  },
];