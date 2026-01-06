import React from 'react';
import type { MachineStatus } from '../types/machine';

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  statusFilter: MachineStatus | 'All';
  onStatusChange: (s: MachineStatus | 'All') => void;
}

const STATUSES: (MachineStatus | 'All')[] = ['All', 'Running', 'Idle', 'Offline'];

export const SearchBar: React.FC<Props> = ({ query, onQueryChange, statusFilter, onStatusChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search machines by name..."
        className="flex-1 border rounded px-3 py-2"
      />

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as MachineStatus | 'All')}
        className="w-44 border rounded px-2 py-2"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};
