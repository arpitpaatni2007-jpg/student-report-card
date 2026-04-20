import React, { useState } from "react";

function Reportcard() {

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

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const getTotal = (m) =>
    m.web + m.python + m.maths + m.physics;

  const getAverage = (m) =>
    (getTotal(m) / 4).toFixed(2);

  const getStatus = (m) =>
    getAverage(m) >= 40 ? "Pass" : "Fail";

  const totalStudents = students.length;

  const passedStudents = students.filter(
    (s) => getStatus(s.marks) === "Pass"
  ).length;

  const failedStudents = students.filter(
    (s) => getStatus(s.marks) === "Fail"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-6">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          📊 Student Report Card
        </h1>

 
        <div className="flex justify-around mb-6 text-center">

          <div className="bg-blue-100 px-4 py-2 rounded shadow">
            <p className="text-xl font-bold">{totalStudents}</p>
            <p className="text-sm">Total Students</p>
          </div>

          <div className="bg-green-100 px-4 py-2 rounded shadow">
            <p className="text-xl font-bold">{passedStudents}</p>
            <p className="text-sm">Passed</p>
          </div>

          <div className="bg-red-100 px-4 py-2 rounded shadow">
            <p className="text-xl font-bold">{failedStudents}</p>
            <p className="text-sm">Failed</p>
          </div>

        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-6">

          <input
            className="border px-3 py-2 rounded w-40"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {Object.keys(marks).map((sub) => (
            <input
              key={sub}
              className="border px-2 py-2 w-24 rounded text-center"
              placeholder={sub.toUpperCase()}
              value={marks[sub]}
              onChange={(e) =>
                setMarks({ ...marks, [sub]: e.target.value })
              }
            />
          ))}

          <button
            onClick={handleAddStudent}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Add
          </button>

        </div>


        <div className="overflow-x-auto">
          <table className="w-full text-center border rounded-lg overflow-hidden">

            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th>Web Dev</th>
                <th>Python</th>
                <th>Maths</th>
                <th>Physics</th>
                <th>Total</th>
                <th>Avg</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => {
                const status = getStatus(student.marks);

                return (
                  <tr
                    key={student.id}
                    className={`border ${
                      status === "Fail"
                        ? "bg-red-100 hover:bg-red-200"
                        : "hover:bg-gray-100"
                    }`}
                  >

                    <td className="p-2 font-medium">{student.name}</td>

                    {Object.keys(student.marks).map((sub) => (
                      <td key={sub}>
                        {student.editing ? (
                          <input
                            className="w-16 border rounded text-center"
                            value={student.marks[sub]}
                            onChange={(e) =>
                              updateMarks(student.id, sub, e.target.value)
                            }
                          />
                        ) : (
                          student.marks[sub]
                        )}
                      </td>
                    ))}

                    <td>{getTotal(student.marks)}</td>
                    <td>{getAverage(student.marks)}</td>

                    <td
                      className={
                        status === "Pass"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {status}
                    </td>

                    <td className="space-x-2">

                      <button
                        onClick={() => toggleEdit(student.id)}
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded shadow-sm"
                      >
                        {student.editing ? "Save" : "Edit"}
                      </button>

                      <button
                        onClick={() => deleteStudent(student.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default Reportcard;