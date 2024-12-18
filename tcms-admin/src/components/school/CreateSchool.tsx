import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import FormValues from "../../types/form.types";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDataSchema } from "../../lib/schema";
import Step4 from "./Step4";
interface CreateSchoolProps {
  handleCloseModal: () => void;
}

function CreateSchool({ handleCloseModal }: CreateSchoolProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm({
    resolver: zodResolver(formDataSchema), // Use Zod for schema validation
  });
  const [completed, setCompleted] = useState(false);

  const nextStep = async () => {
    // Trigger validation for the current form state
    const isValid = await methods.trigger([
      "logo",
      "name",
      "email",
      "phoneNumber",
      "address",
    ]);

    if (!isValid) {
      console.log("Validation errors:", methods.formState.errors); // Log errors
      return; // Prevent advancing to the next step
    }
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Validation failed. Please fill in the required fields.");
    }
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const completeTask = () => {
    // handleSubmit(onSubmit)();
  };
  const form = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      logo: null,
    },
    resolver: zodResolver(formDataSchema),
  });
  const onSubmit = useCallback(
    (data: FormValues) => {
      console.log("Form Data Submitted:", data);
      console.log("Validation Errors:", methods.formState.errors);
      const processedData = {
        ...data,
        logo: {
          fileName: data.logo?.name || "No file uploaded",
        },
      };
      console.log(processedData);
    },
    [methods.formState.errors],
  );

  return (
    <FormProvider {...methods}>
      <motion.div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-[680px] overflow-auto flex flex-col justify-between"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h2 className="mt-3 mb-3 text-center text-2xl font-bold">
            Create New School
          </h2>
          {/* Progress Bar */}
          <div className="relative mb-4">
            <div className="absolute top-5 left-5 right-5 h-1 bg-gray-300"></div>
            <div className="flex justify-between relative z-10">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                    currentStep >= step
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-300 text-gray-700 border-gray-300"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {completed ? (
            <div className="text-center ">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                School Created Successfully!
              </h2>
              <motion.div
              //   animate={{ rotate: 360, scale: 1 }}
              //   transition={{ repeat: Infinity, duration: 1.5 }}
              >
                🎉
              </motion.div>
              <button
                onClick={handleCloseModal}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="flex-1">
              {currentStep === 1 && <Step1 />}

              {/* Step 2 */}
              {currentStep === 2 && <Step2 />}

              {/* Step 3 */}
              {currentStep === 3 && <Step3 />}
              {/* Step 4 */}
              {currentStep === 4 && <Step4 />}
            </div>
          )}

          {/* Buttons */}
          {!completed && (
            <div className="flex justify-between mt-4">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Back
                </button>
              )}
              {currentStep < 4 && (
                <button
                  onClick={nextStep}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Next
                </button>
              )}
              {currentStep === 4 && (
                <button
                  onClick={completeTask}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  type="submit"
                >
                  Complete
                </button>
              )}
            </div>
          )}
        </motion.form>
      </motion.div>
    </FormProvider>
  );
}

export default CreateSchool;
