import React from 'react';
import prisma from '../../../../lib/prisma';
import AdminTemplateForm from '../../../../components/AdminTemplateForm';

type Props = { params: { id: string } };

export default async function EditPage({ params }: Props) {
  const t = await prisma.template.findUnique({ where: { id: params.id } });
  if (!t) return <div>Not found</div> as any;

  return (
    <div>
      <h2 className="text-2xl mb-4">Edit Template</h2>
      <AdminTemplateForm initial={t as any} onSaved={() => (window.location.href = '/admin')} />
    </div>
  );
}
