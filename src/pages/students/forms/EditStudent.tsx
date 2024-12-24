import { API_BASE_URL } from "@/store/features/studentSlice";
import React, { useState } from "react";

interface Props {
  handleModalClose: () => void;
  fetchStudents: () => void;
  editData: {
    id: string;
    studentName: string;
    cohort: string;
    courses: string[];
    joinDate: string;
    lastLogin: string;
    status: string;
  };
}

const EditStudent = ({ handleModalClose, fetchStudents, editData }: Props) => {
  const [formData, setFormData] = useState<{
    studentName: string;
    cohort: string;
    courses: string[];
    joinDate: string;
    lastLogin: string;
    status: string;
  }>({
    studentName: editData.studentName,
    cohort: editData.cohort,
    courses: editData.courses,
    joinDate: editData.joinDate,
    lastLogin: editData.lastLogin,
    status: editData.status,
  });

  const [errors, setErrors] = useState({
    studentName: "",
    cohort: "",
    courses: "",
    joinDate: "",
    lastLogin: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      courses: checked
        ? [...prev.courses, value]
        : prev.courses.filter((course) => course !== value),
    }));
    setErrors((prev) => ({ ...prev, courses: "" }));
  };

  const validate = () => {
    const newErrors = {
      studentName: formData.studentName ? "" : "Student name is required.",
      cohort: formData.cohort ? "" : "Cohort is required.",
      courses: formData.courses.length ? "" : "At least one course must be selected.",
      joinDate: formData.joinDate ? "" : "Join date is required.",
      lastLogin: formData.lastLogin ? "" : "Last login is required.",
      status: formData.status ? "" : "Status is required.",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formattedData = {
          ...formData,
          joinDate: new Date(formData.joinDate).toISOString(),
          lastLogin: new Date(formData.lastLogin).toISOString(),
        };

        const response = await fetch(`${API_BASE_URL}students/${editData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });

        if (response.ok) {
          alert("Student updated successfully!");
          fetchStudents();
          handleModalClose();
          setFormData({
            studentName: "",
            cohort: "",
            courses: [],
            joinDate: "",
            lastLogin: "",
            status: "",
          });
        } else {
          const errorData = await response.json();
          alert(`Failed to add student: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <form
      className="max-w-lg mx-auto bg-white p-3 border rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Student Name</label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          className="w-full bg-slate-100 mt-1 p-2 border border-gray-300 rounded-md"
        />
        {errors.studentName && <p className="text-red-500 text-sm">{errors.studentName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Cohort</label>
        <select
          name="cohort"
          value={formData.cohort}
          onChange={handleChange}
          className="w-full bg-slate-100 mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Cohort</option>
          <option value="AB 2024-25">AB 2024-25</option>
          <option value="XY 2024-25">XY 2024-25</option>
          <option value="AY 2024-25">AY 2024-25</option>
        </select>
        {errors.cohort && <p className="text-red-500 text-sm">{errors.cohort}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Courses</label>
        <div className="flex flex-wrap gap-2">
          {["CBSE 9 Science", "CBSE 9 Maths", "CBSE 9 English"].map((course) => (
            <label key={course} className="flex items-center">
              <input
                type="checkbox"
                value={course}
                checked={formData.courses.includes(course)}
                onChange={handleCheckboxChange}
                className="mr-2 bg-slate-100"
              />
              {course}
            </label>
          ))}
        </div>
        {errors.courses && <p className="text-red-500 text-sm">{errors.courses}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Join Date</label>
        <input
          type="date"
          name="joinDate"
          value={formData.joinDate ? formData.joinDate.split("T")[0] : ""}
          onChange={handleChange}
          className="w-full mt-1 bg-slate-100 p-2 border border-gray-300 rounded-md"
        />
        {errors.joinDate && <p className="text-red-500 text-sm">{errors.joinDate}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Last Login</label>
        <input
          type="date"
          name="lastLogin"
          value={formData.lastLogin ? formData.lastLogin.split("T")[0] : ""}
          onChange={handleChange}
          className="w-full mt-1 bg-slate-100 p-2 border border-gray-300 rounded-md"
        />
        {errors.lastLogin && <p className="text-red-500 text-sm">{errors.lastLogin}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <div className="flex gap-4">
          {["active", "inactive"].map((status) => (
            <label key={status} className="flex items-center">
              <input
                type="radio"
                name="status"
                value={status}
                checked={formData.status === status}
                onChange={handleChange}
                className="mr-2 bg-slate-100"
              />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          ))}
        </div>
        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={handleModalClose}
        className="bg-red-500 ml-4 text-white px-3 py-2 rounded-md hover:bg-red-600"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditStudent;
