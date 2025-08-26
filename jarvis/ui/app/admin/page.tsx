'use client';
import { useEffect, useState } from 'react';

interface AgentCfg {
  id: string; name: string; model: string; system: string; temperature: number; max_tokens: number;
}

export default function AdminPage() {
  const [agents, setAgents] = useState<AgentCfg[]>([]);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_AGENT_BASE}/config`).then(r=>r.json()).then(data=>setAgents(data.agents));
  }, []);

  function updateAgent(index: number, field: keyof AgentCfg, value: any) {
    const copy = [...agents];
    copy[index] = { ...copy[index], [field]: value };
    setAgents(copy);
  }

  async function save() {
    await fetch(`${process.env.NEXT_PUBLIC_AGENT_BASE}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey, agents })
    });
    setApiKey('');
    alert('Sauvegardé');
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-sm">Clé OpenRouter</label>
        <input type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} className="bg-gray-800 p-2 w-64" />
      </div>
      {agents.map((a,idx)=>(
        <div key={a.id} className="border border-gray-700 p-2 space-y-2">
          <h2 className="font-bold">{a.name}</h2>
          <input className="bg-gray-800 p-1 w-full" value={a.name} onChange={e=>updateAgent(idx,'name',e.target.value)} />
          <textarea className="bg-gray-800 p-1 w-full" value={a.system} onChange={e=>updateAgent(idx,'system',e.target.value)} />
          <input className="bg-gray-800 p-1 w-full" value={a.model} onChange={e=>updateAgent(idx,'model',e.target.value)} />
          <input type="number" step="0.1" min="0" max="1" className="bg-gray-800 p-1" value={a.temperature} onChange={e=>updateAgent(idx,'temperature',parseFloat(e.target.value))} />
          <input type="number" className="bg-gray-800 p-1" value={a.max_tokens} onChange={e=>updateAgent(idx,'max_tokens',parseInt(e.target.value))} />
        </div>
      ))}
      <button className="px-4 py-2 bg-blue-700" onClick={save}>Enregistrer</button>
    </div>
  );
}
