
import React from 'react';

interface SidebarProps {
  activeTab: 'generator' | 'knowledge' | 'profiles';
  setActiveTab: (tab: 'generator' | 'knowledge' | 'profiles') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'generator', label: 'Engine', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    )},
    { id: 'profiles', label: 'Profiles', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13.732 4c-.774-1.202-2.21-2-3.732-2-1.523 0-2.958.798-3.732 2m9.732 0c.774 1.202 2.21 2 3.732 2 1.523 0 2.958-.798 3.732-2" /></svg>
    )},
    { id: 'knowledge', label: 'Voice DNA', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    )},
  ];

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
          R
        </div>
        <div className="hidden md:block">
          <h1 className="text-sm font-bold text-gray-900 tracking-tight uppercase">Reagan 2.0</h1>
          <p className="text-xs text-gray-500">Executive Engine</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gray-100 text-black font-semibold'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {tab.icon}
            <span className="hidden md:block text-sm">{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 hidden md:block">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-700">Ready to Ship</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
