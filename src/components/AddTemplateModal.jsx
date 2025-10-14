import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const AddTemplateModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Reminder');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !content) return alert('Please fill in all fields.');
    const newTemplate = {
      id: Date.now(),
      name,
      type,
      content,
      channels: ['Email'], // Default
      status: 'Draft',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    onAdd(newTemplate);
    onClose();
    setName(''); setType('Reminder'); setContent('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 m-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Create New Template</h2>
          <button onClick={onClose}><X className="w-6 h-6 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full input-style" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Template Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full input-style bg-white">
              <option>Reminder</option>
              <option>System</option>
              <option>Broadcast</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="4" className="w-full input-style" required />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Save Template</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTemplateModal;