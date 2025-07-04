import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import type { Node  } from '@xyflow/react';
import { BsArrowLeft } from 'react-icons/bs';

type SettingsProps = {
  node: Node  & { data: { text: string } };
  message: string;
  onMessageChange: (text: string) => void;
};

const SettingsPanel = ({message, onMessageChange }: SettingsProps) => {

  // Used for updating the message in the settings panel onMessageChange is a callback function that will be called when the text changes
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onMessageChange(e.target.value);
  };

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
      <div className="flex items-center gap-4 p-4 border-b border-gray-400">
        <button className="text-gray-600 hover:text-gray-900">
          <BsArrowLeft size={18} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Message</h2>
      </div>

      <div className="p-4 flex-1">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Text</h3>
          <textarea
            value={message}
            onChange={handleTextChange}
            className="p-3 bg-gray-50 rounded border border-gray-200 w-full text-gray-800 min-h-[100px]"
            placeholder="Type your message here..."
          />
        </div>
      </div>
    </div>
  </ResizableBox>
  );
};

export default SettingsPanel;