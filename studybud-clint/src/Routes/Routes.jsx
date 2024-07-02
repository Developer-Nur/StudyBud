import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Assignments from "../Pages/Assignments/Assignments";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import CreateAssignments from "../Pages/CreateAssignments/CreateAssignments";
import PendingAssignments from "../Pages/PendingAssignments/PendingAssignments";
import PrivetRoutes from "../PrivetRoutes/PrivetRoutes";
import UpdateAssignment from "../Components/UpdateAssignment/UpdateAssignment";
import AssignmentDetails from "../Components/AssignmentDetails/AssignmentDetails";
import MySubmitted from "../Pages/MySubmitted/MySubmitted";


const router = createBrowserRouter([

    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'assignments',
                element: <Assignments></Assignments>,
                // loader: () => fetch('https://studybud-server.vercel.app/allassignmens')
            },
            {
                path: 'updateassignment/:id',
                element: <PrivetRoutes><UpdateAssignment></UpdateAssignment></PrivetRoutes>,
                loader: ({ params }) => fetch(`https://studybud-server.vercel.app/allassignmens/${params.id}`)
            },
            {
                path: 'assignmentdetails/:id',
                element: <PrivetRoutes> <AssignmentDetails></AssignmentDetails> </PrivetRoutes>,
                loader: ({ params }) => fetch(`https://studybud-server.vercel.app/allassignmens/${params.id}`)
            },
            {
                path: 'createassignments',
                element: <PrivetRoutes><CreateAssignments></CreateAssignments></PrivetRoutes>,
            },
            {
                path: 'mysubmitted',
                element: <PrivetRoutes><MySubmitted></MySubmitted> </PrivetRoutes>,
            },
            {
                path: 'pendingassignments',
                element: <PrivetRoutes><PendingAssignments></PendingAssignments></PrivetRoutes>,
                loader: () => fetch('https://studybud-server.vercel.app/all-pending-assignments')
            },

            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>,
            },

 ]
    },
]);

export default router