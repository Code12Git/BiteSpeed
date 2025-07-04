import type { Node } from '@xyflow/react';
import toast from 'react-hot-toast'
interface NavbarProps {
  onSaveFlow: () => void;
  nodes:Node[];
  nodesWithoutTarget:Node[];
}

const Navbar = ({ onSaveFlow,nodes,nodesWithoutTarget }: NavbarProps) => {
  const handleClick = () => {
    
    // Case 1:When there are no nodes at all
    if (nodes.length === 0) {
      toast.error("Cannot save empty flow!");
      return;
    }
    // Case 2: Multiple nodes with multiple unconnected targets
    if (nodes.length > 1 && nodesWithoutTarget.length > 1) {
      toast.error(`Cannot save flow. Multiple nodes are unconnected!`);
      return;
    }
  
    // All other cases are valid
    onSaveFlow();
    toast.success("Flow saved successfully!");
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
