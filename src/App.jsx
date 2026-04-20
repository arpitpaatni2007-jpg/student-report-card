import React, { useState } from "react";
import Header from "./components/Header";
import AddStudentForm from "./components/AddStudentForm";
import StudentTable from "./components/StudentTable";

function App() {

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Arpit",
      marks: { web: 70, python: 80, maths: 75, physics: 65 },
      editing: false
    }
  ]);

  const [name, setName] = useState("");
  const [marks, setMarks] = useState({
    web: "", python: "", maths: "", physics: ""
  });

  const handleAddStudent = () => {
    if (name === "") return;

    const newStudent = {
      id: students.length + 1,
      name,
      marks: {
        web: parseInt(marks.web) || 0,
        python: parseInt(marks.python) || 0,
        maths: parseInt(marks.maths) || 0,
        physics: parseInt(marks.physics) || 0
      },
      editing: false
    };

    setStudents([...students, newStudent]);
    setName("");
    setMarks({ web: "", python: "", maths: "", physics: "" });
  };

  const toggleEdit = (id) => {
    setStudents(students.map(s =>
      s.id === id ? { ...s, editing: !s.editing } : s
    ));
  };

  const updateMarks = (id, subject, value) => {
    setStudents(students.map(s =>
      s.id === id
        ? {
            ...s,
            marks: {
              ...s.marks,
              [subject]: parseInt(value) || 0
            }
          }
        : s
    ));
  };

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-6">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl">

        <Header />

        <AddStudentForm
          name={name}
          setName={setName}
          marks={marks}
          setMarks={setMarks}
          handleAddStudent={handleAddStudent}
        />

        <StudentTable
          students={students}
          toggleEdit={toggleEdit}
          updateMarks={updateMarks}
          handleDelete={handleDelete}
        />

      </div>

    </div>
  );
}

export default App;