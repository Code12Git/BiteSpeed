import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const MessagePanel = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <ResizableBox
      width={300}
      height={Infinity}
      minConstraints={[200, 0]}
      maxConstraints={[600, 0]}
      axis="x"
      resizeHandles={['w']}
    >
      <div className="h-screen overflow-auto bg-white p-4 border-l border-gray-200 flex flex-col">
        <div
          draggable
          onDragStart={(event) => onDragStart(event, 'messageNode')}
          className="cursor-grab border-blue-400 p-4 border-2 flex flex-col text-blue-400 rounded justify-center items-center hover:bg-blue-50"
        >
          <IoChatbubbleEllipsesOutline style={{ width: '32px', height: '48px' }} />
          <h2 className="text-lg font-semibold mt-2">Message</h2>
        </div>
      </div>
    </ResizableBox>
  );
};

export default MessagePanel;
