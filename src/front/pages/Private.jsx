import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const loadPrivate = async () => {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            const data = await resp.json();

            if (!resp.ok) {
                sessionStorage.removeItem("token");
                navigate("/login");
            } else {
                setUser(data.user);
                setLoading(false);
            }
        };

        loadPrivate();
    }, []);

    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
        <div className="container mt-5">
            <h1>Private Area</h1>
            <p>Welcome, {user.email}</p>
        </div>
    );
};
