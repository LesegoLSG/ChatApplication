import React from "react";

const ConfirmationBox = ({ message, onConfirm, onCancel }) => {
  return (
    // Overlay to cover the whole screen and darken the background
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Container for the confirmation box */}
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        {/* Message displayed in the confirmation box */}
        <p className="text-lg mb-4">{message}</p>

        {/* Buttons for confirming or canceling the action */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
