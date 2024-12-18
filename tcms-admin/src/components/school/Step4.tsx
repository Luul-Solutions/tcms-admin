import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import FormValues from "../../types/form.types";

export default function Step4() {
  const { getValues } = useFormContext<FormValues>();
  const allValues = getValues();

  // Generate the image preview URL using useMemo
  const logoPreview = useMemo(() => {
    return allValues.logo ? URL.createObjectURL(allValues.logo) : null;
  }, [allValues.logo]);

  const summaryData = {
    ...allValues,
    logo: {
      fileName: allValues.logo?.name || "No file uploaded",
    },
  };

  return (
    <>
      <h1 className="my-3 md:mt-8">Finishing up</h1>
      <p className="mb-5 md:mb-10">
        Double-check everything looks OK before confirming.
      </p>
      <div className="bg-brand-magnolia p-5 rounded-xl flex flex-col">
        {Object.entries(summaryData).map(([key, value]) =>
          key === "logo" && logoPreview ? (
            <div
              key={key}
              className="flex justify-between items-center gap-3 mb-5"
            >
              <h6 className="capitalize">{key}</h6>
              <div>
                <img
                  src={logoPreview}
                  alt="Uploaded Logo"
                  className="h-16 w-16 object-cover rounded-md"
                />
                <p>{allValues.logo?.name}</p>
              </div>
            </div>
          ) : (
            value !== null && (
              <div
                key={key}
                className="flex justify-between items-center gap-3 mb-5"
              >
                <h6 className="capitalize">{key}</h6>
                <span>
                  {typeof value === "object"
                    ? JSON.stringify(value)
                    : String(value)}
                </span>
              </div>
            )
          ),
        )}
      </div>
    </>
  );
}
