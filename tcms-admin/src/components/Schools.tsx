import React, { useState } from "react";

const Schools: React.FC = () => {
  const [schools, setSchools] = useState<string[]>([]);
  const [newSchool, setNewSchool] = useState<string>("");

  const addSchool = (): void => {
    if (newSchool.trim() !== "") {
      setSchools([...schools, newSchool]);
      setNewSchool("");
    }
  };

  const deleteSchool = (index: number): void => {
    setSchools(schools.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Schools</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newSchool}
          onChange={(e) => setNewSchool(e.target.value)}
          placeholder="Enter school name"
          className="flex-grow border rounded p-2 mr-2"
        />
        <button
          onClick={addSchool}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add School
        </button>
      </div>
      <ul>
        {schools.map((school, index) => (
          <li
            key={index}
            className="bg-gray-100 p-2 rounded flex justify-between items-center mb-2 shadow"
          >
            {school}
            <button
              onClick={() => deleteSchool(index)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schools;
