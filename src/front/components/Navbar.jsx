import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

	const logout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container">
				<a className="navbar-brand" href="/">JWT App</a>
				<button className="btn btn-danger" onClick={logout}>
					Logout
				</button>
			</div>
		</nav>
	);
};
