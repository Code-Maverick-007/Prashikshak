import { useState, useMemo } from 'react';
import { Send, Mail, MessageSquare, Plus, Eye } from 'lucide-react';
import { initialTemplates, initialRecentNotifications } from '../data/notificationData';
import AddTemplateModal from '../components/AddTemplateModal';
import PreviewTemplateModal from '../components/PreviewTemplateModal';

const NotificationsBroadcast = () => {
  // --- STATE MANAGEMENT ---
  const [templates, setTemplates] = useState(initialTemplates);
  const [recentNotifications, setRecentNotifications] = useState(initialRecentNotifications);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formState, setFormState] = useState({ templateId: templates[0]?.id || '', recipients: 'All Students' });

  // --- DYNAMIC SUMMARY STATS ---
  const summaryStats = useMemo(() => ({
    scheduled: templates.filter(t => t.status === 'Scheduled').length,
    // For demo, we'll imagine counts. In a real app, this would come from logs.
    emailSent: 1234,
    smsSent: 456,
  }), [templates]);
  
  // --- HANDLER FUNCTIONS ---
  const handleAddTemplate = (newTemplate) => {
    setTemplates(prev => [newTemplate, ...prev]);
  };

  const handlePreview = (template) => {
    setSelectedTemplate(template);
    setIsPreviewModalOpen(true);
  };
  
  const handleSend = () => {
    const template = templates.find(t => t.id == formState.templateId);
    if (!template) return alert('Please select a template.');
    
    const newNotification = {
      id: Date.now(),
      title: template.name,
      recipients: Math.floor(Math.random() * 200) + 50, // Random recipient count
      time: 'Just now',
    };

    setRecentNotifications(prev => [newNotification, ...prev]);
    alert(`"${template.name}" sent to ${formState.recipients}!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications & Broadcast</h1>
          <p className="text-sm text-gray-500 mt-1">Manage communication templates and broadcasts</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card"><Mail className="w-5 h-5 text-blue-600" /><div className="stat">{summaryStats.emailSent.toLocaleString()}</div><div className="label">Emails Sent</div></div>
        <div className="card"><MessageSquare className="w-5 h-5 text-green-600" /><div className="stat">{summaryStats.smsSent.toLocaleString()}</div><div className="label">SMS Sent</div></div>
        <div className="card"><Send className="w-5 h-5 text-yellow-600" /><div className="stat">{summaryStats.scheduled}</div><div className="label">Scheduled</div></div>
      </div>

      <div className="bg-white rounded-xl p-6 border">
        <h2 className="text-lg font-bold mb-4">Templates</h2>
        <div className="space-y-3">
          {templates.map((template) => (
            <div key={template.id} className="flex items-center justify-between p-4 border rounded-xl">
              <div>
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{template.type}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${template.status === 'Sent' || template.status === 'Draft' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                  {template.status}
                </span>
                <button onClick={() => handlePreview(template)} className="p-2 hover:bg-gray-100 rounded-lg"><Eye className="w-4 h-4 text-gray-600" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border">
          <h2 className="text-lg font-bold mb-4">Recent Notifications</h2>
          <div className="space-y-3">
            {recentNotifications.map((notif) => (
              <div key={notif.id} className="p-3 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-gray-900">{notif.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{notif.recipients} recipients • {notif.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border">
          <h2 className="text-lg font-bold mb-4">Send & Schedule</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Template</label>
              <select value={formState.templateId} onChange={(e) => setFormState(s => ({...s, templateId: e.target.value}))} className="w-full input-style bg-white">
                {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Select Recipients</label>
              <select value={formState.recipients} onChange={(e) => setFormState(s => ({...s, recipients: e.target.value}))} className="w-full input-style bg-white">
                <option>All Colleges</option>
                <option>All Students</option>
                <option>Industry Partners</option>
              </select>
            </div>
            <button onClick={handleSend} className="w-full btn-primary flex items-center justify-center gap-2 py-3">
              <Send className="w-4 h-4" />
              Send Notification
            </button>
          </div>
        </div>
      </div>

      <AddTemplateModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddTemplate} />
      <PreviewTemplateModal isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)} template={selectedTemplate} />
      
      <style>{`
        .card { background-color: white; border-radius: 0.75rem; padding: 1.5rem; border: 1px solid #e5e7eb; }
        .stat { font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 0.5rem; }
        .label { font-size: 0.875rem; color: #6b7280; }
        .input-style { display: block; width: 100%; border-radius: 0.75rem; border: 1px solid #d1d5db; padding: 0.5rem 1rem; }
        .btn-primary { padding: 0.5rem 1rem; background-color: #2563eb; color: white; border-radius: 0.75rem; transition: background-color 0.2s; }
        .btn-primary:hover { background-color: #1d4ed8; }
        .btn-secondary { padding: 0.5rem 1rem; background-color: #f3f4f6; color: #374151; border-radius: 0.75rem; transition: background-color 0.2s; }
        .btn-secondary:hover { background-color: #e5e7eb; }
      `}</style>
    </div>
  );
};

export default NotificationsBroadcast;