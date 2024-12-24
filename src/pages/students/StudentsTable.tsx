import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FaEdit, FaPlus } from 'react-icons/fa';
import AddStudents from './forms/AddStudents';
import EditStudent from './forms/EditStudent';
import { API_BASE_URL } from '@/store/features/studentSlice';
import { RiDeleteBin7Fill } from "react-icons/ri";

type Student = {
  id: string;
  studentName: string;
  cohort: string;
  courses: string[];
  joinDate: string;
  lastLogin: string;
  status: string;
};

export function StudentsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnType, setBtnType] = useState<'add' | 'edit'>('add');
  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [editItem, setEditItem] = useState<Student | null>(null);

  const [cohortFilter, setCohortFilter] = useState<string>('');
  const [courseFilter, setCourseFilter] = useState<string>('');

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddStudent = () => {
    setBtnType('add');
    handleModalOpen();
  };

  const handleEditStudent = (item: Student) => {
    setBtnType('edit');
    setEditItem(item);
    handleModalOpen();
  };

  const handleDeleteStudent = async (item: Student) => {
    try {
   const res= window.confirm('Are you sure you want to delete this student?');
    if(!res){
      return;
    }
      await fetch(`${API_BASE_URL}students/delete/${item.id}`, { method: 'DELETE' });
      fetchStudents();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}students`);
      const data = await response.json();
      setStudentsData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredStudents = studentsData && studentsData.filter((student) => {
    const matchesCohort = cohortFilter ? student.cohort === cohortFilter : true;
    const matchesCourse = courseFilter
      ? student.courses.some((course) => course === courseFilter)
      : true;
    return matchesCohort && matchesCourse;
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="rounded-md border bg-white p-4 m-3">
      <div className="flex justify-between mb-8">
        <div className="flex gap-4">
          <select
            className="rounded-md bg-white border p-2"
            value={cohortFilter}
            onChange={(e) => setCohortFilter(e.target.value)}
          >
            <option value="">Filter by Cohort</option>
            <option value="AB 2024-25">AB 2024-25</option>
            <option value="XY 2024-25">XY 2024-25</option>
            <option value="AY 2024-25">AY 2024-25</option>
          </select>

          <select
            className="rounded-md bg-white border p-2"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="">Filter by Courses</option>
            <option value="CBSE 9 Science">CBSE 9 Science</option>
            <option value="CBSE 9 Maths">CBSE 9 Maths</option>
            <option value="CBSE 9 English">CBSE 9 English</option>
          </select>
        </div>
        <button
          onClick={handleAddStudent}
          className="bg-slate-400 flex items-center gap-2 text-black text-md font-semibold rounded-md p-2 mt-2"
        >
          <FaPlus className="text-sm" />
          Add new student
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black font-semibold">Student Name</TableHead>
            <TableHead className="text-black font-semibold">Cohort</TableHead>
            <TableHead className="text-black font-semibold">Courses</TableHead>
            <TableHead className="text-black font-semibold">Date Joined</TableHead>
            <TableHead className="text-black font-semibold">Last Date</TableHead>
            <TableHead className="text-black font-semibold">Status</TableHead>
            <TableHead className="text-black font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents?.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.studentName}</TableCell>
              <TableCell>{student.cohort}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {student.courses.map((course) => (
                    <Badge key={course} variant="secondary">
                      {course}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{student.joinDate}</TableCell>
              <TableCell>{student.lastLogin}</TableCell>
              <TableCell>
                <div className="flex items-center">
                <div
                  className={`${
                    student.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  } text-white rounded-md p-2`}
                />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <FaEdit onClick={() => handleEditStudent(student)}
                  className="text-green-600 rounded-md text-2xl"/>
                    
                  <RiDeleteBin7Fill 
                    onClick={() => handleDeleteStudent(student)}
                  className="text-red-600 rounded-md text-2xl"/>
                  
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {btnType === 'add' ? 'Add new student' : 'Edit student'}
            </h2>
            {btnType === 'add' ? (
              <AddStudents fetchStudents={fetchStudents} handleModalClose={handleModalClose} />
            ) : (
              <EditStudent
                fetchStudents={fetchStudents}
                handleModalClose={handleModalClose}
                editData={editItem}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
