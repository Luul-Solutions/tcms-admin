import React, { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";

const Teams: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<string[]>([
    "Alice",
    "Bob",
    "Charlie",
  ]);
  const [newMember, setNewMember] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleAddMember = () => {
    if (newMember && !teamMembers.includes(newMember)) {
      setTeamMembers([...teamMembers, newMember]);
      setNewMember("");
      setMessage("Team member added locally.");
    } else {
      setMessage("Member already exists or empty input.");
    }
  };

  const handleRemoveMember = (name: string) => {
    setTeamMembers(teamMembers.filter((member) => member !== name));
    setMessage(`Removed ${name} from the team.`);
  };

  /*
  // Commented-out backend integration for later use

  const addMemberToServer = async () => {
    try {
      const response = await axios.post("https://api.example.com/add-member", {
        newMember,
      });

      if (response.status === 200) {
        setMessage("Team member added to the server!");
      }
    } catch (error) {
      console.error("Failed to add member to the server", error);
      setMessage("Failed to add team member to the server.");
    }
  };

  const removeMemberFromServer = async (name: string) => {
    try {
      const response = await axios.delete(`https://api.example.com/remove-member/${name}`);

      if (response.status === 200) {
        setMessage(`Removed ${name} from the server.`);
      }
    } catch (error) {
      console.error("Failed to remove member from the server", error);
      setMessage("Failed to remove team member from the server.");
    }
  };
  */

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Team Management</h2>

      {/* Input field to add a new team member */}
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

        {message && <p className="mt-2 text-red-500">{message}</p>}
      </div>

      {/* Render the team members list */}
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
            {/*
            <button
              onClick={() => removeMemberFromServer(member)}
              className="ml-2 bg-yellow-500 text-black p-2 rounded-lg"
            >
              Remove from Server
            </button>
            */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
