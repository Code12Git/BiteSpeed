import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './redux/store.ts'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { ReactFlowProvider } from '@xyflow/react'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ReactFlowProvider>
      <Toaster />
      <App />
    </ReactFlowProvider>

  </Provider>,
)
