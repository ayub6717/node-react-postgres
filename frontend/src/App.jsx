import { useState } from 'react'
import UsersList from './components/UsersList'
import ProductsList from './components/ProductsList'
import CreateUserForm from './components/CreateUserForm'

const tabs = [
  { id: 'users', label: 'Users', icon: '👥' },
  { id: 'products', label: 'Products', icon: '📦' },
  { id: 'create', label: 'Add User', icon: '➕' },
]

function App() {
  const [activeTab, setActiveTab] = useState('users')
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';
  const swaggerUrl = apiBaseUrl.replace('/api', '/api-docs');

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              🚀 Full-Stack Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              React + Node.js + PostgreSQL
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              API Connected
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'users' && <UsersList />}
          {activeTab === 'products' && <ProductsList />}
          {activeTab === 'create' && <CreateUserForm />}
        </div>

        {/* Info Panel */}
        <div className="mt-10 bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">📡 Service Info</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg px-4 py-3">
              <p className="text-xs text-gray-500 mb-0.5">Backend API</p>
              <p className="text-sm font-mono text-gray-800">{apiBaseUrl}</p>
            </div>
            <div className="bg-gray-50 rounded-lg px-4 py-3">
              <p className="text-xs text-gray-500 mb-0.5">Swagger Docs</p>
              <a
                href={swaggerUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-mono text-blue-600 hover:underline"
              >
                {swaggerUrl}
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 py-5 text-center">
        <p className="text-sm text-gray-400">Full-Stack App — React · Express · PostgreSQL</p>
      </footer>
    </div>
  )
}

export default App
