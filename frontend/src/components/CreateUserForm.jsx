import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api/apiService';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setFormData({ name: '', email: '' });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">Add New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            placeholder="e.g. John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            placeholder="e.g. john@example.com"
            required
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors"
        >
          {mutation.isPending ? 'Creating...' : 'Create User'}
        </button>

        {mutation.isSuccess && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            <span>✅</span>
            <span>User created successfully.</span>
          </div>
        )}

        {mutation.isError && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <span>❌</span>
            <span>{mutation.error.message}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateUserForm;
