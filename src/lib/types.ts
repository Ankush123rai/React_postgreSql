export interface Student {
  id: string;
  name: string;
  cohort: string;
  courses: string[];
  joinDate: string;
  lastDate: string;
  status: 'active' | 'inactive';
}

export interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
}