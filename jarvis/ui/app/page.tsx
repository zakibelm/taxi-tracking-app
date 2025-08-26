'use client';
import { useEffect, useState } from 'react';

interface Agent { id: string; name: string; }
interface Message { role: 'user' | 'assistant'; content: string; }

export default function ChatPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentId, setAgentId] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_AGENT_BASE}/agents`)
      .then(r => r.json())
      .then((data: any[]) => {
        setAgents(data);
        if (data[0]) setAgentId(data[0].id);
      });
  }, []);

  async function send() {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    const res = await fetch(`${process.env.NEXT_PUBLIC_AGENT_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId, messages: newMessages })
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.content }]);
  }

  return (
    <div className="flex h-full">
      <aside className="w-48 border-r border-gray-700 p-2">
        <ul>
          {agents.map(a => (
            <li key={a.id} className={`p-2 cursor-pointer ${agentId===a.id?'bg-gray-700':''}`} onClick={()=>setAgentId(a.id)}>
              {a.name}
            </li>
          ))}
        </ul>
      </aside>
      <section className="flex-1 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-2">
          {messages.map((m,i)=>(
            <div key={i} className={`p-2 rounded ${m.role==='user'?'bg-blue-600 self-end':'bg-gray-700 self-start'}`}>{m.content}</div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input className="flex-1 bg-gray-800 p-2" value={input} onChange={e=>setInput(e.target.value)} />
          <button className="ml-2 px-4 bg-blue-700" onClick={send}>Envoyer</button>
        </div>
      </section>
    </div>
  );
}
