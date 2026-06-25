import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Private } from "./Private";
import { Home } from "./Home";

export const Layout = () => {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/private" element={<Private />} />
                <Route path="*" element={<h1>Not found!</h1>} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
};
