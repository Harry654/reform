import React, { useState, useEffect } from "react";
import {
  Dialog,
  Transition,
  DialogTitle,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { X, Copy, Check } from "lucide-react";

interface AccessURLModalProps {
  isOpen: boolean;
  onClose: () => void;
  accessUrl: string;
}

const AccessURLModal: React.FC<AccessURLModalProps> = ({
  isOpen,
  onClose,
  accessUrl,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accessUrl);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                  Survey created successfully
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </DialogTitle>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Share this URL with participants to access your survey
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={accessUrl}
                      readOnly
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 ease-in-out"
                      aria-label={copied ? "Copied" : "Copy to clipboard"}
                    >
                      <Transition
                        show={!copied}
                        enter="transition-opacity duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Copy size={20} />
                      </Transition>
                      <Transition
                        show={copied}
                        enter="transition-transform duration-200"
                        enterFrom="scale-0"
                        enterTo="scale-100"
                        leave="transition-transform duration-200"
                        leaveFrom="scale-100"
                        leaveTo="scale-0"
                      >
                        <Check size={20} className="text-green-600 absolute" />
                      </Transition>
                    </button>
                  </div>
                  <Transition
                    show={copied}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <p className="mt-2 text-sm text-green-600">
                      URL successfully copied to clipboard!
                    </p>
                  </Transition>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AccessURLModal;
