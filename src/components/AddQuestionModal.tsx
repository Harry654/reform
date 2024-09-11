import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { QuestionType } from "@/types/question";
import { surveyQuestions } from "@/constants/question_types";
import AddIcon from "./icons/AddIcon";

interface AddQuestionModalProps {
  onAddQuestion: (type: QuestionType, segment_id: string) => void;
  segment_id: string;
}

export default function AddQuestionModal({
  onAddQuestion,
  segment_id,
}: AddQuestionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <p
        className="w-min whitespace-nowrap flex items-center gap-2 border border-gray-400 rounded-3xl py-1 px-2 text-sm cursor-pointer hover:scale-105 duration-200"
        onClick={openModal}
      >
        <AddIcon />
        Add Question
      </p>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Choose Question Type
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Select the type of question you&apos;d like to add to your
                      survey.
                    </p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {surveyQuestions.map((questionType) => (
                      <button
                        key={questionType.type}
                        className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
                        onClick={() => {
                          onAddQuestion(questionType.type, segment_id);
                          closeModal();
                        }}
                      >
                        <h4 className="text-sm font-medium text-gray-900">
                          {questionType.label}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {questionType.description}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
