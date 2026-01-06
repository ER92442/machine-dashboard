import type { Machine, MachineStatus } from '../types/machine';

function genId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const SAMPLE_MACHINES: Machine[] = [
  { id: genId(), name: 'Cutter A1', status: 'Running', updatedAt: new Date().toISOString() },
  { id: genId(), name: 'Lathe B2', status: 'Idle', updatedAt: new Date().toISOString() },
  { id: genId(), name: 'Press C3', status: 'Offline', updatedAt: new Date().toISOString() },
  { id: genId(), name: 'Welder D4', status: 'Running', updatedAt: new Date().toISOString() },
  { id: genId(), name: 'Polisher E5', status: 'Idle', updatedAt: new Date().toISOString() },
  { id: genId(), name: 'Sorter F6', status: 'Running', updatedAt: new Date().toISOString() },
  { id: genId(), name: 'Inspector G7', status: 'Offline', updatedAt: new Date().toISOString() },
];

export function createMachine(name: string, status: MachineStatus): Machine {
  return { id: genId(), name, status, updatedAt: new Date().toISOString() };
}

export function updateTimestamp(m: Machine): Machine {
  return { ...m, updatedAt: new Date().toISOString() };
}
