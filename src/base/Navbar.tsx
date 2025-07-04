interface NavbarProps {
  onSaveFlow: (text: string, id: string) => void;
}

const Navbar = ({ onSaveFlow }: NavbarProps) => {
  const handleClick = () => {
    onSaveFlow("Updated text from Navbar", "1"); 
  };

  return (
    <div className="p-2 bg-gray-100 flex justify-end">
      <button 
        onClick={handleClick}
        className="text-blue-600 hover:text-blue-800 cursor-pointer hover:scale-105 transition-all p-2 px-4 rounded border border-blue-400 hover:border-blue-600 hover:bg-blue-50"
      >
        Save Flow
      </button>
    </div>
  );
};

export default Navbar;
