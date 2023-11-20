import "./App.css";
import { Content } from "./components";
import { HomeLayout } from "./layouts";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const H1 = ({ text }) => (
  <h1 style={{ textAlign: "center", paddingTop: "64px" }}>{text}</h1>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<Content />} />
      <Route path="/task1" element={<H1 text="TASK-1" />} />
      <Route path="/task2" element={<H1 text="TASK-2" />} />
      <Route path="/projects">
        <Route path="a" element={<H1 text="Project-A" />} />
        <Route path="b" element={<H1 text="Project-B" />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
