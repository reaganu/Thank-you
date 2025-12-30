
import React, { useState } from 'react';
import { Recipient, Channel, Formality } from '../types';

interface ProfileManagerProps {
  recipients: Recipient[];
  onUpdate: (recipients: Recipient[]) => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ recipients, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProfile, setNewProfile] = useState<Partial<Recipient>>({});

  const handleSave = () => {
    if (!newProfile.name) return;
    const profile = {
      id: editingId || Math.random().toString(36).substr(2, 9),
      name: newProfile.name!,
      role: newProfile.role || '',
      relationship: newProfile.relationship || '',
      formality: newProfile.formality || Formality.PROFESSIONAL,
      channel: newProfile.channel || Channel.EMAIL,
      notes: newProfile.notes || '',
    };

    if (editingId) {
      onUpdate(recipients.map(r => r.id === editingId ? profile : r));
    } else {
      onUpdate([...recipients, profile]);
    }
    setNewProfile({});
    setEditingId(null);
  };

  const removeProfile = (id: string) => {
    onUpdate(recipients.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Recipient Profiles</h2>
          <p className="text-gray-500 mt-2">Manage preferences for key relationships.</p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setNewProfile({}); }}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-all"
        >
          Add New
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(editingId === null && !newProfile.name && recipients.length === 0) && (
          <p className="col-span-2 text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            No profiles yet. Add your first key contact.
          </p>
        )}

        {(editingId !== null || Object.keys(newProfile).length > 0) && (
          <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-xl border-2 border-black shadow-lg space-y-4">
            <h3 className="font-bold text-lg">{editingId ? 'Edit Profile' : 'New Profile'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                placeholder="Name"
                className="p-2 border border-gray-300 rounded-lg text-sm"
                value={newProfile.name || ''}
                onChange={e => setNewProfile({...newProfile, name: e.target.value})}
              />
              <input 
                placeholder="Role / Company"
                className="p-2 border border-gray-300 rounded-lg text-sm"
                value={newProfile.role || ''}
                onChange={e => setNewProfile({...newProfile, role: e.target.value})}
              />
              <select 
                className="p-2 border border-gray-300 rounded-lg text-sm"
                value={newProfile.formality}
                onChange={e => setNewProfile({...newProfile, formality: e.target.value as Formality})}
              >
                {Object.values(Formality).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <select 
                className="p-2 border border-gray-300 rounded-lg text-sm"
                value={newProfile.channel}
                onChange={e => setNewProfile({...newProfile, channel: e.target.value as Channel})}
              >
                {Object.values(Channel).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <textarea 
                placeholder="Notes / Sensitivities"
                className="col-span-1 sm:col-span-2 p-2 border border-gray-300 rounded-lg text-sm h-20"
                value={newProfile.notes || ''}
                onChange={e => setNewProfile({...newProfile, notes: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="px-4 py-2 bg-black text-white rounded-lg text-sm font-bold">Save Profile</button>
              <button onClick={() => { setEditingId(null); setNewProfile({}); }} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        )}

        {recipients.map(r => (
          <div key={r.id} className="bg-white p-5 rounded-xl border border-gray-200 group hover:border-black transition-all">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-gray-900">{r.name}</h4>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditingId(r.id); setNewProfile(r); }} className="text-xs text-blue-600 font-semibold">Edit</button>
                <button onClick={() => removeProfile(r.id)} className="text-xs text-red-600 font-semibold">Delete</button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">{r.role} • {r.relationship}</p>
            <div className="flex gap-2 mt-3">
              <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full font-bold text-gray-600 uppercase tracking-tighter">{r.formality}</span>
              <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full font-bold text-gray-600 uppercase tracking-tighter">{r.channel}</span>
            </div>
            {r.notes && <p className="text-[11px] text-gray-400 mt-3 italic">{r.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileManager;
