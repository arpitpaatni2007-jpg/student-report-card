function AddStudentForm({ name, setName, marks, setMarks, handleAddStudent }) {
  return (
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
  );
}

export default AddStudentForm;