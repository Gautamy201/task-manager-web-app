import Router from "./router/Router";
import HomePage from "./pages/HomePage";
import DashBoard from "./pages/DashBoard";
import AllTask from "./components/AllTask";
import Completed from "./components/Completed";
import Important from "./components/Important";
import DoItNow from "./components/DoItNow";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Router />,
    children: [
      {
        path: "",
        element: <DashBoard />,
        children: [
          {
            path: "",
            element: <AllTask />,
          },
          {
            path: "all-task",
            element: <AllTask />,
          },
          {
            path: "important",
            element: <Important />,
          },
          {
            path: "completed",
            element: <Completed />,
          },
          {
            path: "do-it-now",
            element: <DoItNow />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <HomePage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
