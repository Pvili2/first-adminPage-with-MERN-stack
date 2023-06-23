import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import "../CSS/IndexLayout.css";

export default function IndexLayout() {

    return (
        <div className="container">
            <Navbar />
            <Outlet />
        </div>
    )
}