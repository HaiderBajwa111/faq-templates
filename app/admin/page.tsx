import React from 'react';
import prisma from '../../lib/prisma';
import AdminLogin from '../../components/AdminLogin';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function AdminPage() {
  const cookieStore = cookies();
  const adminCookie = cookieStore.get('admin_auth')?.value || '';
  const isAuth = adminCookie && adminCookie === process.env.ADMIN_PASSWORD;

  if (!isAuth) {
    return (
      <div className="min-h-[60vh] flex items-center">
        <AdminLogin />
      </div>
    );
  }

  const templates = await prisma.template.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">Admin Dashboard</h2>
        <div className="flex gap-2">
          <Link href="/admin/new" className="px-3 py-1 rounded bg-[#7c5cff]">Add New Template</Link>
          <form action="/api/admin/logout" method="post">
            <button className="px-3 py-1 rounded bg-[#111118]">Logout</button>
          </form>
        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-gray-400">
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((t) => (
            <tr key={t.id} className="border-t border-gray-800">
              <td className="py-3">{t.name}</td>
              <td>{t.category}</td>
              <td>{t.isPublished ? 'Published' : 'Draft'}</td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
              <td className="py-2">
                <Link href={`/admin/edit/${t.id}`} className="mr-2 text-sm text-[#7c5cff]">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
