function StudentRow({ student, toggleEdit, updateMarks, handleDelete }) {

  const getTotal = (m) =>
    m.web + m.python + m.maths + m.physics;

  const getAverage = (m) =>
    (getTotal(m) / 4).toFixed(2);

  const getStatus = (m) =>
    getAverage(m) >= 40 ? "Pass" : "Fail";

  const status = getStatus(student.marks);

  return (
    <tr
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

      <td className="flex gap-2 justify-center">
        <button
          onClick={() => toggleEdit(student.id)}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
        >
          {student.editing ? "Save" : "Edit"}
        </button>

        <button
          onClick={() => handleDelete(student.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>

    </tr>
  );
}

export default StudentRow;