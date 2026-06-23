import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch(process.env.BACKEND_URL + "/api/private", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.msg === "Invalid or expired token") {
                    sessionStorage.removeItem("token");
                    navigate("/login");
                } else {
                    setUser(data.user);
                }
            });
    }, []);

    return (
        <div className="container mt-5">
            <h1>Private Page</h1>
            {user ? (
                <p>Welcome, {user.email}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
