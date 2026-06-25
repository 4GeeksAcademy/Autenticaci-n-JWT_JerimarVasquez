import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (resp.ok) {
            navigate("/login");
        } else {
            const data = await resp.json();
            alert(data.msg || "Error creating user");
        }
    };

    return (
        <div className="container mt-5">
            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-primary">Create account</button>
            </form>
        </div>
    );
};
