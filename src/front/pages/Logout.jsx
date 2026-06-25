import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-dark bg-dark px-4">
            <Link to="/" className="navbar-brand">JWT Auth App</Link>

            <div className="d-flex gap-2">
                <Link to="/signup" className="btn btn-outline-light btn-sm">Signup</Link>
                <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>

                <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};
