import React from 'react';
import type { Machine } from '../types/machine';

interface Props {
  machine: Machine;
  onEdit: (m: Machine) => void;
  onDelete: (id: string) => void;
}

export const MachineCard: React.FC<Props> = ({ machine, onEdit, onDelete }) => {
  const statusColor =
    machine.status === 'Running' ? 'bg-green-100 text-green-800' : machine.status === 'Idle' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{machine.name}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded ${statusColor}`}>{machine.status}</span>
        </div>
        <p className="mt-2 text-sm text-gray-500">Updated: {new Date(machine.updatedAt).toLocaleString()}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(machine)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(machine.id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
