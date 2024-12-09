import React, { useState } from "react";

const Teams: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<string[]>([
    "Alice",
    "Bob",
    "Charlie",
  ]);
  const [newMember, setNewMember] = useState<string>("");

  const handleAddMember = () => {
    if (newMember && !teamMembers.includes(newMember)) {
      setTeamMembers([...teamMembers, newMember]);
      setNewMember("");
    }
  };

  const handleRemoveMember = (name: string) => {
    setTeamMembers(teamMembers.filter((member) => member !== name));
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Team Management</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Add Team Member"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          className="w-full mt-2 p-2 rounded-lg bg-gray-100"
        />
        <button
          onClick={handleAddMember}
          className="mt-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
        >
          Add Member
        </button>
      </div>

      <div>
        {teamMembers.map((member) => (
          <div key={member} className="flex items-center justify-between mt-2">
            <span className="text-gray-900">{member}</span>
            <button
              onClick={() => handleRemoveMember(member)}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
