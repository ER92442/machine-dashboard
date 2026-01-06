import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { type Machine } from './types/machine';
import { useLocalStorage } from './hooks/useLocalStorage';
import { SAMPLE_MACHINES, createMachine, updateTimestamp } from './services/machineService';
import { MachineList } from './components/MachineList';
import { MachineForm } from './components/MachineForm';
import { SearchBar } from './components/SearchBar';

type DeletedRecord = { machine: Machine; timerId: number | null } | null;

function App(): React.ReactElement {
  const [machines, setMachines] = useLocalStorage<Machine[]>('machines:v1', SAMPLE_MACHINES);

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Running' | 'Idle' | 'Offline'>('All');

  const [editing, setEditing] = useState<Machine | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [deleted, setDeleted] = useState<DeletedRecord>(null);

  useEffect(() => {
    // ensure seeding only if localStorage empty
    if (!machines || machines.length === 0) {
      setMachines(SAMPLE_MACHINES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function handleSave(data: { name: string; status: Machine['status'] }) {
    if (editing) {
      setMachines((prev) => prev.map((m) => (m.id === editing.id ? { ...m, name: data.name, status: data.status, updatedAt: new Date().toISOString() } : m)));
    } else {
      const m = createMachine(data.name, data.status);
      setMachines((prev) => [m, ...prev]);
    }
    setShowForm(false);
    setEditing(null);
  }

  function handleEdit(m: Machine) {
    setEditing(m);
    setShowForm(true);
  }

  function handleDelete(id: string) {
    const toDelete = machines.find((m) => m.id === id);
    if (!toDelete) return;

    // remove immediately
    setMachines((prev) => prev.filter((m) => m.id !== id));

    // clear any existing deleted record timer
    if (deleted && deleted.timerId) {
      window.clearTimeout(deleted.timerId);
    }

    const timerId = window.setTimeout(() => {
      setDeleted(null);
    }, 5000);

    setDeleted({ machine: toDelete, timerId });
  }

  function undoDelete() {
    if (!deleted) return;
    if (deleted.timerId) window.clearTimeout(deleted.timerId);
    setMachines((prev) => [updateTimestamp(deleted.machine), ...prev]);
    setDeleted(null);
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return machines.filter((m) => {
      if (statusFilter !== 'All' && m.status !== statusFilter) return false;
      if (q && !m.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [machines, query, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Machine Dashboard</h1>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Add Machine</button>
          </div>
        </header>

        <div className="mb-4">
          <SearchBar query={query} onQueryChange={setQuery} statusFilter={statusFilter} onStatusChange={setStatusFilter} />
        </div>

        <main>
          {showForm && (
            <div className="mb-4 bg-white p-4 rounded shadow">
              <MachineForm
                initial={editing ?? undefined}
                onCancel={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                onSave={handleSave}
              />
            </div>
          )}

          <MachineList machines={visible} onEdit={handleEdit} onDelete={handleDelete} />
        </main>

        {deleted && (
          <div className="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-3 rounded shadow flex items-center gap-4">
            <div>
              Deleted "{deleted.machine.name}".
            </div>
            <button onClick={undoDelete} className="underline">
              Undo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
