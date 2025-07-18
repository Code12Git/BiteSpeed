import { Handle, Position } from '@xyflow/react';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaWhatsappSquare } from "react-icons/fa";
import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { updateNode } from '../redux/action/nodeAction';

type EdgeData = {
  text: string;
};

type Props = {
  id: string;
  data: EdgeData;
};

const MessageNode = ({ id, data }: Props) => {
  const dispatch = useAppDispatch();
  const [, setIsNodeClicked] = useState(false);

  const nodeHandler = () => {
    setIsNodeClicked(true);
    dispatch(updateNode({ id, isClicked: true }));
  };

  return (
    <div onClick={nodeHandler} className="w-64 rounded-md shadow-md border border-gray-300 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-teal-100 px-3 py-2 rounded-t-md">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <span><IoChatbubbleEllipsesOutline /></span>
          <span>Send Message</span>
        </div>
        <span className="text-green-600 font-bold text-lg"><FaWhatsappSquare /></span>
      </div>

      {/* Text */}
      <div className="p-3 text-sm text-gray-800">
        {data?.text}
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ width: 12, height: 12, backgroundColor: 'gray' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ width: 12, height: 12, backgroundColor: 'gray' }}
      />
    </div>
  );
};

export default MessageNode;
