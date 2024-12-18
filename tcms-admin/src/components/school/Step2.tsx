import React from "react";
import { useFormContext } from "react-hook-form";

function Step2() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const selectedAdmin = watch("adminId"); // Watch for the selected admin
  const admins = [
    { id: "1", name: "Admin 1" },
    { id: "2", name: "Admin 2" },
    { id: "3", name: "Admin 3" },
  ]; // Replace with API data

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Assign Admin to the New School
      </h2>
      <ul>
        {admins.map((admin) => (
          <li key={admin.id} className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                {...register("adminId", { required: "Please select an admin" })}
                value={admin.id}
                onChange={() => setValue("adminId", admin.id)}
              />
              <span>{admin.name}</span>
            </label>
          </li>
        ))}
      </ul>
      {errors.adminId && (
        <p className="text-red-500 text-sm mt-1">
          {String(errors.adminId.message)}
        </p>
      )}
    </div>
  );
}

export default Step2;
