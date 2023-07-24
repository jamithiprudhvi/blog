import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import Footer from "./components/Footer"
import Login from "./components/Login"
import Register from "./components/Register"
import Single from "./pages/Single"
import Write from "./pages/Write"
import Home from "./pages/Home"
import Navbar from './components/Navbar'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/post/:id", element: <Single /> },
      { path: "/write", element: <Write /> },
    ],
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;