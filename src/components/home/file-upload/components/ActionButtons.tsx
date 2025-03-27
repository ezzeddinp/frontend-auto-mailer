interface ActionButtonsProps {
    onCancel: () => void;
    onSubmit: () => void;
  }
  
  const ActionButtons: React.FC<ActionButtonsProps> = ({ onCancel, onSubmit }) => {
    return (
      <div className="p-4">
        <div className="flex space-x-4 justify-end">
          <button
            onClick={onCancel}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all duration-300 ease-in text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-all duration-300 ease-in cursor-pointer text-sm"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default ActionButtons;