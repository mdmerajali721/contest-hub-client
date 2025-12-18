import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllContests from "../pages/AllContests/AllContests";
import ContestDetails from "../components/ContestDetails/ContestDetails";
import PrivateRoute from "./PrivateRoute";
import AddContest from "../pages/Dashboards/CreatorDashboard/AddContest/AddContest";
import MyContests from "../pages/Dashboards/CreatorDashboard/MyContests/MyContests";
import ContestSubmissions from "../pages/Dashboards/CreatorDashboard/ContestSubmissions/ContestSubmissions";
import EditContest from "../pages/Dashboards/CreatorDashboard/EditContest/EditContest";
import ManageContests from "../pages/Dashboards/AdminDashboard/ManageContests/ManageContests";
import ManageUsers from "../pages/Dashboards/AdminDashboard/ManageUsers/ManageUsers";
import DashboardLayout from "../Layouts/DashboardLayout";
import { ParticipatedContests } from "../pages/Dashboards/UserDashboard/ParticipatedContests/ParticipatedContests";
import { WinningContests } from "../pages/Dashboards/UserDashboard/WinningContests/WinningContests";
import { UserProfile } from "../pages/Dashboards/UserDashboard/UserProfile/UserProfile";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel/PaymentCancel";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import CreatorRoute from "./CreatorRoute";
import About from "./../pages/extra/About";
import NotFound from "../pages/Error/NotFound";
import ForgotPassword from "../pages/Auth/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/all-contests",
        Component: AllContests,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/leaderboard",
        Component: Leaderboard,
      },
      {
        path: "/contest/:id",
        element: (
          <PrivateRoute>
            {" "}
            <ContestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "contest/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "contest/payment-cancelled",
        Component: PaymentCancel,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/auth/forgot-password",
        Component: ForgotPassword,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "participated-contests",

        element: (
          <UserRoute>
            {" "}
            <ParticipatedContests />
          </UserRoute>
        ),
      },
      {
        path: "winning",

        element: (
          <UserRoute>
            <WinningContests />
          </UserRoute>
        ),
      },
      {
        path: "profile",

        element: (
          <UserRoute>
            {" "}
            <UserProfile />
          </UserRoute>
        ),
      },

      {
        path: "add-contest",

        element: (
          <CreatorRoute>
            {" "}
            <AddContest />
          </CreatorRoute>
        ),
      },
      {
        path: "my-contests",

        element: (
          <CreatorRoute>
            {" "}
            <MyContests />
          </CreatorRoute>
        ),
      },
      {
        path: "submissions/:contestId",

        element: (
          <CreatorRoute>
            <ContestSubmissions />
          </CreatorRoute>
        ),
      },
      {
        path: "edit-contest/:id",

        element: (
          <CreatorRoute>
            <EditContest />
          </CreatorRoute>
        ),
      },

      {
        path: "users",

        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "contests",

        element: (
          <AdminRoute>
            <ManageContests />
          </AdminRoute>
        ),
      },
    ],
  },
]);
