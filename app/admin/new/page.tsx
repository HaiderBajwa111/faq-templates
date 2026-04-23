'use client';
import React from 'react';
import AdminTemplateForm from '../../../components/AdminTemplateForm';

export default function NewTemplatePage() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Add New Template</h2>
      <AdminTemplateForm onSaved={() => window.location.href = '/admin'} />
    </div>
  );
}
