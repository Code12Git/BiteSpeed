import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import type { NodeProps } from '../types';
import { BsArrowLeft } from 'react-icons/bs';
import { useState } from 'react';

const SettingsPanel = ({ node }: { node: NodeProps }) => {

  const [message,setMessage] = useState('')

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  console.log(message)

  return (
    <ResizableBox
      width={300}
      height={Infinity}
      minConstraints={[250, Infinity]}
      maxConstraints={[500, Infinity]}
      axis="x"
      resizeHandles={['w']}
      className="relative border-l border-gray-300 bg-white"
    >
      <div className="h-full overflow-y-auto flex flex-col">

        {/* Header Section */}
        <div className='flex items-center gap-4 p-4 border-b border-gray-400 '>
          <button className="text-gray-600 hover:text-gray-900">
            <BsArrowLeft size={18} />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Message</h2>
        </div>
  
        {/* Content Section */}
        <div className="p-4 flex-1">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Text</h3>
            <textarea onChange={(e)=>setMessage(e.target.value)} className="p-3 bg-gray-50 rounded border border-gray-200 w-full text-gray-800">
              {node?.data?.text || "Type your message here..."}
            </textarea>
          </div>

         
        </div>

        {/* Draggable Node */}
        <div 
          className="p-3 m-4 border border-gray-300 rounded-md bg-gray-50 flex items-center gap-2 cursor-move"
          draggable
          onDragStart={(event) => onDragStart(event, 'messageNode')}
        >
          <IoChatbubbleEllipsesOutline className="text-gray-600" />
          <span className="text-sm text-gray-700">Send Message</span>
        </div>
      </div>
    </ResizableBox>
  );
};

export default SettingsPanel;