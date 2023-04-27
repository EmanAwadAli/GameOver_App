import React, { useEffect, useState } from "react";
import Layout from "./Components/Layout/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Platforms from "./Components/GamesByPlatform/GamesByPlatform";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AllGames from "./Components/AllGames/AllGames";
import GameDetails from "./Components/GameDetails/GameDetails";
import GamesByCategory from "./Components/GamesByCategory/GamesByCategory";
import GamesBySort from "./Components/GamesBySort/GamesBySort";
import { SkeletonTheme } from "react-loading-skeleton";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyRestCode from "./Components/VerifyRestCode/VerifyRestCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

export default function App() {
  const [user, setUser] = useState(null);
  function saveUserDate() {
    let user = jwtDecode(localStorage.getItem("userToken"));
    setUser(user);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserDate();
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} setUser={setUser} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/games/all",
          element: (
            <ProtectedRoute>
              <AllGames />
            </ProtectedRoute>
          ),
        },
        {
          path: "/games/platforms/:platform",
          element: (
            <ProtectedRoute>
              <Platforms />
            </ProtectedRoute>
          ),
        },
        {
          path: "/games/sort-by/:sort",
          element: (
            <ProtectedRoute>
              <GamesBySort />
            </ProtectedRoute>
          ),
        },
        {
          path: "/games/categories/:category",
          element: (
            <ProtectedRoute>
              <GamesByCategory />
            </ProtectedRoute>
          ),
        },
        {
          path: "/games/gamedetails/:id",
          element: (
            <ProtectedRoute>
              <GameDetails />
            </ProtectedRoute>
          ),
        },
        { path: "/login", element: <Login saveUserDate={saveUserDate} /> },
        { path: "/register", element: <Register /> },
        { path: "/forgetPassword", element: <ForgetPassword /> },
        { path: "/verifyRestCode", element: <VerifyRestCode /> },
        {
          path: "/resetPassword",
          element: <ResetPassword saveUserDate={saveUserDate} />,
        },
        {
          path: "*",
          element: (
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <SkeletonTheme baseColor="#30343a" highlightColor="#3d424a">
      <RouterProvider router={router}></RouterProvider>
    </SkeletonTheme>
  );
}
