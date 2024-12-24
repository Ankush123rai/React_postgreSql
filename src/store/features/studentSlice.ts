import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const API_BASE_URL = "https://node-postgresql-zs8l.onrender.com/";


export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
  const response = await fetch(API_BASE_URL);
  return await response.json();
});

export const addStudent = createAsyncThunk("students/addStudent", async (studentData: any) => {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });
  return await response.json();
});

export const updateStudent = createAsyncThunk("students/updateStudent", async (studentData: any) => {
  const response = await fetch(`${API_BASE_URL}/students/${studentData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });
  return await response.json();
});

export const deleteStudent = createAsyncThunk("students/deleteStudent", async (id: string) => {
  await fetch(`${API_BASE_URL}/students/delete/${id}`, { method: "DELETE" });
  return id;
});

type Student = {
  id: string;
  studentName: string;
  cohort: string;
  courses: string[];
  joinDate: string;
  lastLogin: string;
  status: string;
};

type StudentState = {
  students: Student[];
  loading: boolean;
  error: string | null;
};

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        console.log("Fetched Students:", action.payload);
        state.loading = false;
        state.students = action.payload;
      })
      
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch students.";
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
