import React from 'react';
import type { Machine } from '../types/machine';
import { MachineCard } from './MachineCard';

interface Props {
  machines: Machine[];
  onEdit: (m: Machine) => void;
  onDelete: (id: string) => void;
}

export const MachineList: React.FC<Props> = ({ machines, onEdit, onDelete }) => {
  if (machines.length === 0) {
    return <div className="text-center text-gray-500">No machines found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {machines.map((m) => (
        <MachineCard key={m.id} machine={m} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
