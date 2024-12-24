import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export function DashboardStats() {
  const { students } = useSelector((state: RootState) => state.students);
  const activeStudents = students.filter(s => s.status === 'active').length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{students.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeStudents}</div>
        </CardContent>
      </Card>
    </div>
  );
}
