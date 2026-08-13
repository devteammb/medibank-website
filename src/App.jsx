import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Users from "./pages/Users";
import Ice from "./pages/Ice";
import Partners from "./pages/Partners";
import Resources from "./pages/Resources";
import HealthGuides from "./pages/HealthGuides";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Claim from "./pages/Claim";
import Login from "./pages/Login";
import { Page } from "./ui";

function NotFound() {
  return (
    <Page>
      <section className="mbp-pad"><div className="mbp">
        <div className="mb-eyebrow">404</div>
        <h1 className="mb-h1" style={{ marginTop: "24px" }}>Page not found.</h1>
        <Link to="/" className="mb-btn" style={{ marginTop: "28px" }}>← Back to Home</Link>
      </div></section>
    </Page>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "doctors", element: <Doctors /> },
      { path: "users", element: <Users /> },
      { path: "ice", element: <Ice /> },
      { path: "partners", element: <Partners /> },
      { path: "resources", element: <Resources /> },
      { path: "health-guides", element: <HealthGuides /> },
      { path: "about", element: <About /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogArticle /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy-policy", element: <Legal which="privacy" /> },
      { path: "terms-and-conditions", element: <Legal which="terms" /> },
      { path: "claim", element: <Claim /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
