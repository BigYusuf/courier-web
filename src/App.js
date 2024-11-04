import React from "react";
import About from "./frontend/about";
import Home from "./frontend/home";
import Contact from "./frontend/contact";
import Services from "./frontend/services";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import {
  ForUsersOnly,
  RedirectIfAuthenticated,
  RequireAuth,
  RolePermit,
} from "./middleware";
import {
  Customers,
  Dashboard,
  EditPackage,
  EditStaff,
  EditUser,
  ManageOrder,
  Orders,
  Packages,
  PassReset,
  Profile,
  SignIn,
  SignUp,
  Staffs,
} from "./pages";
import { Sidebar, Topnav } from "./components";

// function App() {
//   return (
//     <div>
//       <div id="smooth-wrapper">
//         <div id="smooth-content">
//           <BrowserRouter>
//             {/* <Header /> */}
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="/services" element={<Services />} />
//             </Routes>
//             <Footer />
//           </BrowserRouter>
//         </div>
//       </div>
//     </div>
//   );
// }

function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };

  const PrivateRoutes = () => {
    // if (user && myProfile.role !== "user") {
    return (
      <div className={`layoutt`}>
        <Sidebar />
        <div className="layoutt__content">
          <Topnav />
          <div className="layoutt__content-main">
            <Outlet />
          </div>
        </div>
      </div>
    );
    // } else {
    //   return <Navigate to="/login" />;
    // }
  };
  const router = createBrowserRouter([
    {
      // element: <RequireAuth Component={PrivateRoutes} />,
      element: <PrivateRoutes />,
      children: [
        //     {
        //       path: "/addpackage", element: <RolePermit Component={AddPackage} />
        //     },

        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/orders/:id",
          element: <ManageOrder />,
        },
        {
          path: "/mypackages",
          element: <RolePermit Component={Packages} />,
        },
        {
          path: "/mypackage/:id",
          element: <RolePermit Component={EditPackage} />,
        },
        {
          path: "/users",
          element: <RolePermit Component={Customers} />,
        },
        {
          path: "/users/:id",
          element: <RolePermit Component={EditUser} />,
        },
        {
          path: "/staffs",
          element: <RolePermit Component={Staffs} />,
        },
        {
          path: "/staffs/:id",
          element: <RolePermit Component={EditStaff} />,
        },
        //     {
        //       path: "/messages", element: <Messages />
        //     },
        {
          path: "/profile",
          element: <Profile />,
        },
        //     {
        //       path: "/message/:id", element: <Message />
        //     },
        {
          path: "/dashboard",
          element: <RolePermit Component={Dashboard} />,
        },
        //     {
        //       path: "/analytics", element: <RolePermit Component={Analytics} />
        //     },
      ],
    },
    {
      path: "/new",
      element: <RedirectIfAuthenticated Component={SignUp} />,
    },
    {
      path: "/signin",
      element: <RedirectIfAuthenticated Component={SignIn} />,
    },
    {
      path: "/passreset",
      element: <RedirectIfAuthenticated Component={PassReset} />,
    },
    // {
    //   path: "register", element: <RedirectIfAuthenticated Component={Register} />
    // },
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/services",
          element: <Services />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
