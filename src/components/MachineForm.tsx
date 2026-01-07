import React, { useState } from 'react';
import type { Machine, MachineStatus } from '../types/machine';

interface Props {
  initial?: Partial<Machine>;
  onCancel: () => void;
  onSave: (data: { name: string; status: MachineStatus }) => void;
}

const STATUSES: MachineStatus[] = ['Running', 'Idle', 'Offline'];

export const MachineForm: React.FC<Props> = ({ initial = {}, onCancel, onSave }) => {
  const [name, setName] = useState(initial.name ?? '');
  const [status, setStatus] = useState<MachineStatus>((initial.status as MachineStatus) ?? 'Idle');
  const [errors, setErrors] = useState<{ name?: string }>(() => ({}));


//   useEffect(() => {
//     setName(initial.name ?? '');
//     setStatus((initial.status as MachineStatus) ?? 'Idle');
//   }, [initial]);

  function validate() {
    const e: { name?: string } = {};
    if (!name || name.trim().length < 2) e.name = 'Name is required (min 2 chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({ name: name.trim(), status });
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
        />
        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as MachineStatus)}
          className="mt-1 block w-full border rounded px-2 py-1"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-1 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};
