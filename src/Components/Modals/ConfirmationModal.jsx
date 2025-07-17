"use client";
import { Dialog } from "@headlessui/react";
import { GrCircleQuestion } from "react-icons/gr";
import Button from "../Actions/Button"; // assuming this is your custom button
import { Fragment } from "react";

const ConfirmationModal = ({
  show,
  onHide,
  heading,
  content,
  contentHeading,
  handleCancel,
  handleConfirm,
}) => {
  return (
    <Dialog open={show} onClose={onHide} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <Dialog.Panel className="w-full max-w-md rounded-md bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-(--borderC) px-4 py-2">
            <Dialog.Title className="font-semibold text-xl">
              {heading || ""}
            </Dialog.Title>
            <button
              onClick={onHide}
              className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            >
              <span className="text-3xl">&times;</span>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 text-center">
            <GrCircleQuestion size={50} className="mx-auto mb-2 text-red-600" />
            <h4 className="font-semibold text-xl">{contentHeading}</h4>
            <p className="mt-1 text-lg">{content || ""}</p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-(--borderC) px-4 py-2">
            <Button
              action={handleCancel || onHide}
              variant="white"
              label="Close"
              className="!rounded-md"
            />
            <Button
              action={handleConfirm}
              label="Confirm"
              className="!rounded-md border !border-(primaryC)"
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmationModal;
