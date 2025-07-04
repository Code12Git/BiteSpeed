import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './redux/store.ts'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { ReactFlowProvider } from '@xyflow/react'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ReactFlowProvider>

      <App />
    </ReactFlowProvider>

  </Provider>,
)
