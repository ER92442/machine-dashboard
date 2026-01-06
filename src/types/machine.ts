export type MachineStatus = 'Running' | 'Idle' | 'Offline';

export interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  updatedAt: string; // ISO timestamp
}
