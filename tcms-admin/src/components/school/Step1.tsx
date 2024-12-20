import { Controller, useFormContext } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import FormValues from "../../types/form.types";

export default function Step1() {
  const {
    control,
    formState: { errors },
    setValue,
    trigger,
  } = useFormContext<FormValues>();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]; // Get the first file
      console.log("Dropped file:", file); // Debug
      setValue("logo", file, { shouldValidate: true }); // Use react-hook-form's setValue
      setLogoPreview(URL.createObjectURL(file)); // Set preview
      trigger("logo"); // Trigger validation for the logo field
    },
    [setValue, trigger],
  );

  const removeLogo = () => {
    setValue("logo", null); // Clear logo in form state
    setLogoPreview(null); // Clear preview
    trigger("logo"); // Trigger validation for the logo field
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleLogoDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center mt-1">
        School Details
      </h2>

      {/* School Name */}
      <div className="grid grid-cols-2 gap-4">
        <label className="block text-gray-700 mb-1">School Name</label>
        <Controller
          name="name"
          control={control} // use control here
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full p-2 rounded-lg bg-gray-200"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{String(errors.name.message)}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <Controller
          name="email"
          control={control} // use control here
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="email"
              className="w-full p-2 rounded-lg bg-gray-200"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-gray-700 mb-1">Phone Number</label>
        <Controller
          name="phoneNumber"
          control={control} // use control here
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full p-2 rounded-lg bg-gray-200"
            />
          )}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">
            {String(errors.phoneNumber.message)}
          </p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block text-gray-700 mb-1">Address</label>
        <Controller
          name="address"
          control={control} // use control here
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full p-2 rounded-lg bg-gray-200"
            />
          )}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">
            {String(errors.address.message)}
          </p>
        )}
      </div>

      {/* Logo Upload */}
      <div className="col-span-2">
        <label className="block text-gray-700 mb-1">Logo</label>
        {!logoPreview ? (
          <div
            {...getRootProps()}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-center bg-gray-100"
          >
            <input {...getInputProps()} />
            <p className="text-gray-500">
              Drag & drop a logo here, or click to select one
            </p>
          </div>
        ) : (
          <div className="relative w-32 h-32">
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="w-full h-full object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={removeLogo}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              X
            </button>
          </div>
        )}
        {errors.logo && (
          <p className="text-red-500 text-sm">{String(errors.logo.message)}</p>
        )}
      </div>
    </div>
  );
}
