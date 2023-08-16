import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

const root = document.getElementById('root');
if (!root) {
  throw new Error("Root element not found");
}
const appRoot = ReactDOM.createRoot(root);
appRoot.render(<App />);