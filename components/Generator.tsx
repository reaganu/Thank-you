
import React, { useState } from 'react';
import { GeneratorInputs, Recipient, Channel, Formality, Length, GeneratedNote } from '../types';
import { generateThankYouNote } from '../services/gemini';

interface GeneratorProps {
  recipients: Recipient[];
}

const Generator: React.FC<GeneratorProps> = ({ recipients }) => {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<GeneratedNote | null>(null);
  const [inputs, setInputs] = useState<Partial<GeneratorInputs>>({
    recipientName: '',
    recipientRole: '',
    channel: Channel.EMAIL,
    tone: Formality.PROFESSIONAL,
    length: Length.STANDARD,
    nextStep: '',
  });

  const handleGenerate = async () => {
    if (!inputs.recipientName || !inputs.occasion || !inputs.detail) {
      alert("Please fill in the minimum required fields: Name, Occasion, and Detail.");
      return;
    }

    setLoading(true);
    try {
      const result = await generateThankYouNote(inputs as GeneratorInputs);
      setNote(result);
    } catch (e) {
      alert("Failed to generate note. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard.");
  };

  const handleProfileSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const r = recipients.find(rep => rep.id === e.target.value);
    if (r) {
      setInputs({ 
        ...inputs, 
        recipientName: r.name, 
        recipientRole: r.role,
        tone: r.formality, 
        channel: r.channel 
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-gray-900">Note Engine</h2>
        <p className="text-gray-500 mt-2">Generate relationship assets in Reagan's voice.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Quick Fill From Profiles</label>
              <select 
                className="w-full border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none border bg-gray-50 text-sm"
                onChange={handleProfileSelect}
                value=""
              >
                <option value="" disabled>Load existing profile data...</option>
                {recipients.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.role})</option>
                ))}
              </select>
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Recipient Name *</label>
                <input 
                  type="text"
                  placeholder="Full Name"
                  className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none border bg-white"
                  value={inputs.recipientName}
                  onChange={(e) => setInputs({...inputs, recipientName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Role / Company</label>
                <input 
                  type="text"
                  placeholder="VP Marketing @ Acme"
                  className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none border bg-white"
                  value={inputs.recipientRole}
                  onChange={(e) => setInputs({...inputs, recipientRole: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Channel</label>
                <select 
                  className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none border bg-gray-50"
                  value={inputs.channel}
                  onChange={(e) => setInputs({...inputs, channel: e.target.value as Channel})}
                >
                  {Object.values(Channel).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tone</label>
                <select 
                  className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none border bg-gray-50"
                  value={inputs.tone}
                  onChange={(e) => setInputs({...inputs, tone: e.target.value as Formality})}
                >
                  {Object.values(Formality).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Occasion / Context *</label>
              <textarea 
                placeholder="What happened? (e.g., Coffee meeting last Tuesday)"
                className="w-full border-gray-300 rounded-lg p-2.5 h-20 focus:ring-2 focus:ring-black outline-none border bg-white"
                value={inputs.occasion}
                onChange={(e) => setInputs({...inputs, occasion: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">One Concrete Detail *</label>
              <input 
                type="text"
                placeholder="Specific phrase or action you noticed"
                className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none border bg-white"
                value={inputs.detail}
                onChange={(e) => setInputs({...inputs, detail: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Desired Next Step</label>
              <input 
                type="text"
                placeholder="e.g., Sending brief by Friday / Let's catch up in June"
                className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-black outline-none border bg-white"
                value={inputs.nextStep}
                onChange={(e) => setInputs({...inputs, nextStep: e.target.value})}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold transition-all ${
                loading ? 'bg-gray-200 text-gray-500' : 'bg-black text-white hover:bg-gray-800 shadow-lg'
              }`}
            >
              {loading ? 'Generating Reagan 2.0 Output...' : 'Generate Note'}
            </button>
          </div>
        </section>

        <section className="space-y-6">
          {!note && !loading && (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 text-gray-400">
              <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              <p className="font-medium">Output will appear here.</p>
              <p className="text-xs mt-1">Minimum inputs: Name, Occasion, and Detail.</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-medium text-gray-900">Applying Voice DNA...</p>
              <p className="text-xs text-gray-500 mt-1">Scrubbing exclamation points and emojis.</p>
            </div>
          )}

          {note && !loading && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md animate-in slide-in-from-right duration-300">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Primary Draft</span>
                  <button 
                    onClick={() => copyToClipboard(note.body)}
                    className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1"
                  >
                    Copy
                  </button>
                </div>
                {note.subject && (
                  <p className="mb-4 text-sm"><span className="font-bold">Subject:</span> {note.subject}</p>
                )}
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {note.body}
                </div>
              </div>

              {note.alternates?.map((alt, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-200 transition-hover hover:border-gray-300">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{alt.label} Version</span>
                    <button 
                      onClick={() => copyToClipboard(alt.content)}
                      className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap text-sm text-gray-700 italic">
                    {alt.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Generator;
