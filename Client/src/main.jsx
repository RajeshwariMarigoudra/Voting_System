import ReactDOM from 'react-dom';
import App, { appRouter } from "./App.jsx";
import { RouterProvider } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter} />
)