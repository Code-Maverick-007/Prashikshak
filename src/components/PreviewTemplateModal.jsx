import { X } from 'lucide-react';

const PreviewTemplateModal = ({ isOpen, onClose, template }) => {
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 m-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{template.name}</h2>
          <button onClick={onClose}><X className="w-6 h-6 text-gray-400" /></button>
        </div>
        <div className="space-y-4 text-sm text-gray-700 border-t pt-4">
          <p><strong>Type:</strong> {template.type}</p>
          <p><strong>Last Used:</strong> {template.date}</p>
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold mb-2">Message Content:</h4>
            <p className="whitespace-pre-wrap">{template.content}</p>
          </div>
        </div>
        <div className="flex justify-end pt-6">
          <button onClick={onClose} className="btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
};

export default PreviewTemplateModal;