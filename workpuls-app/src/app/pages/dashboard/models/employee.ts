import { Shift } from './shift';

export interface Employee {
  id: number;
  name: string;
  email: string;
  hourlyRate: number;
  overtimeHourlyRate: number;
  status: string;
  totalClokedIn: number;
  shifts: Shift[];
}
