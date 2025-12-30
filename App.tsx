
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Generator from './components/Generator';
import KnowledgeBase from './components/KnowledgeBase';
import ProfileManager from './components/ProfileManager';
import { Recipient } from './types';
import { INITIAL_RECIPIENTS } from './constants';

type Tab = 'generator' | 'knowledge' | 'profiles';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('generator');
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  useEffect(() => {
    // Load recipients from local storage or use defaults
    const saved = localStorage.getItem('reagan_recipients');
    if (saved) {
      setRecipients(JSON.parse(saved));
    } else {
      setRecipients(INITIAL_RECIPIENTS as any);
    }
  }, []);

  const saveRecipients = (newRecipients: Recipient[]) => {
    setRecipients(newRecipients);
    localStorage.setItem('reagan_recipients', JSON.stringify(newRecipients));
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'generator' && (
            <Generator recipients={recipients} />
          )}
          {activeTab === 'knowledge' && (
            <KnowledgeBase />
          )}
          {activeTab === 'profiles' && (
            <ProfileManager 
              recipients={recipients} 
              onUpdate={saveRecipients} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
