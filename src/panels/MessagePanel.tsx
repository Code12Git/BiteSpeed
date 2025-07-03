import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

// We are making this box for making Message Panel resizable

const MessagePanel = () => {

  return (
    <ResizableBox
      width={300}
      height={Infinity}
      minConstraints={[200, 0]}
      maxConstraints={[600, 0]}
      axis="x"
      resizeHandles={['w']}  
    >
      <div
        style={{
          height: '100vh',
          overflow: 'auto',
          background: '#ffffff',
          padding: '1rem',
          borderLeft: '1px solid #ccc',
        }}
      >
        <h2>Message Panel</h2>
        <p>This is a resizable sidebar.</p>
      </div>
    </ResizableBox>
  );
};

export default MessagePanel;
