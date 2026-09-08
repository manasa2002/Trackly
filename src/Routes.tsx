import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppShell from "./components/Layout/AppShell";
import Login from "./components/mainpage/Login";
import SignUp from "./components/mainpage/SignUp";
import Dashboard from "./components/Appshell/Dashboard";
import { HomePage } from "./components/mainpage/Homepage";
import Projects from "./components/Appshell/Projects";
import MyTasks from "./components/Appshell/MyTasks";
import ProjectBoard from "./components/Appshell/ProjectBoard";
import Calender from "./components/Appshell/Calender";
import Team from "./components/Appshell/Team";
import Analytics from "./components/Appshell/Analytics";


export default function RoutesComponent() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<AppShell />} >
                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:projectId" element={<ProjectBoard />} />
                    <Route path="/tasks" element={<MyTasks />} />
                    <Route path="/calendar" element={<Calender />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

