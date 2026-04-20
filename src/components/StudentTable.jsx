import StudentRow from "./StudentRow";

function StudentTable({ students, toggleEdit, updateMarks, handleDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center border rounded-lg overflow-hidden">

        <thead className="bg-blue-600 text-white">
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
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              toggleEdit={toggleEdit}
              updateMarks={updateMarks}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default StudentTable;