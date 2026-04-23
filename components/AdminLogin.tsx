"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (res.ok) {
      router.refresh();
      router.push('/admin');
    } else {
      setError('Invalid password');
    }
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto bg-[#0b0b11] p-6 rounded card">
      <h2 className="text-xl mb-3">Admin Login</h2>
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 mb-3 bg-[#111118] rounded" />
      <button className="w-full bg-[#7c5cff] py-2 rounded">Login</button>
      {error && <div className="text-sm text-red-400 mt-2">{error}</div>}
    </form>
  );
}
