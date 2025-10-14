import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const AddInternshipModal = ({ isOpen, onClose, onAdd }) => {
  const initialFormState = {
    name: '',
    company: '',
    category: 'IT',
    vacancies: 10,
    duration: '3 Months',
    status: 'Pending',
    applicants: 0,
  };
  
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.category) {
      alert('Please fill out all required fields.');
      return;
    }
    onAdd(formData);
    onClose();
    setFormData(initialFormState); // Reset form
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 m-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Internship</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Internship Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full input-style" required />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full input-style" required />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full input-style bg-white">
                <option>IT</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Design</option>
              </select>
            </div>
            <div>
              <label htmlFor="vacancies" className="block text-sm font-medium text-gray-700 mb-1">Vacancies</label>
              <input type="number" name="vacancies" min="1" value={formData.vacancies} onChange={handleChange} className="w-full input-style" />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select name="duration" value={formData.duration} onChange={handleChange} className="w-full input-style bg-white">
                <option>3 Months</option>
                <option>6 Months</option>
              </select>
            </div>
             <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full input-style bg-white">
                <option>Pending</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Internship</button>
          </div>
        </form>
      </div>
      {/* Add this to your index.css for reusable styles */}
      <style>{`
        .input-style {
          padding: 0.5rem 1rem;
          border-width: 1px;
          border-color: #d1d5db;
          border-radius: 0.5rem;
          width: 100%;
        }
        .btn-primary {
          padding: 0.5rem 1rem;
          background-color: #2563eb;
          color: white;
          border-radius: 0.5rem;
        }
        .btn-secondary {
          padding: 0.5rem 1rem;
          background-color: #f3f4f6;
          color: #374151;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default AddInternshipModal;