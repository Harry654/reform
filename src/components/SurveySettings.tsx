import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { Settings, X } from "lucide-react";
import { ISurveyFormMetadata } from "@/types/survey";

interface SurveySettingsProps {
  formMetadata: ISurveyFormMetadata;
  onSettingsChange: (setting: string, value: boolean | string) => void;
}

const SurveySettings: React.FC<SurveySettingsProps> = ({
  formMetadata,
  onSettingsChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none rounded-full h-min w-min flex items-center gap-2"
        aria-label="Survey Settings"
      >
        Settings
        <Settings size={20} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                  >
                    Survey Settings
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                    >
                      <X size={20} />
                    </button>
                  </DialogTitle>
                  <div className="mt-4 space-y-8">
                    <div>
                      <label
                        htmlFor="surveyType"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Survey Type
                      </label>
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="normal"
                            name="type"
                            value="normal"
                            checked={formMetadata.type === "normal"}
                            onChange={() => onSettingsChange("type", "normal")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            required
                          />
                          <label
                            htmlFor="normal"
                            className="ml-2 block text-sm font-medium text-gray-700"
                          >
                            Normal
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="interactive"
                            name="type"
                            value="interactive"
                            checked={formMetadata.type === "interactive"}
                            onChange={() =>
                              onSettingsChange("type", "interactive")
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            required
                          />
                          <label
                            htmlFor="interactive"
                            className="ml-2 block text-sm font-medium text-gray-700"
                          >
                            Interactive
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="successMessage"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Success Message (Optional)
                      </label>
                      <input
                        type="text"
                        id="successMessage"
                        name="successMessage"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-sm"
                        placeholder="Enter a custom message to display after the response has been recorded"
                        value={formMetadata.successMessage || ""}
                        onChange={(e) =>
                          onSettingsChange("successMessage", e.target.value)
                        }
                      />
                    </div>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formMetadata.allowAnonymousResponses}
                        onChange={(e) =>
                          onSettingsChange(
                            "allowAnonymousResponses",
                            e.target.checked
                          )
                        }
                        className="form-checkbox h-4 w-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Allow Anonymous Responses
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formMetadata.allowMultipleSubmissions}
                        onChange={(e) =>
                          onSettingsChange(
                            "allowMultipleSubmissions",
                            e.target.checked
                          )
                        }
                        className="form-checkbox h-4 w-4 text-blue-600 rounded"
                        disabled={formMetadata.allowAnonymousResponses}
                      />
                      <span className="text-sm text-gray-700">
                        Allow Multiple Submissions
                      </span>
                    </label>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SurveySettings;
