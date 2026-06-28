import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/apiService';

const UsersList = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">
        <p className="font-semibold text-sm">Failed to load users</p>
        <p className="text-sm mt-1 text-red-500">{error.message}</p>
        <p className="text-xs mt-2 text-red-400">Make sure the API is running on port 3002.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Users</h2>
        <span className="text-sm text-gray-400">{users?.length ?? 0} total</span>
      </div>

      {users?.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p className="text-4xl mb-3">👤</p>
          <p className="text-sm">No users yet. Create one from the Add User tab.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {users?.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 border border-gray-100 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
