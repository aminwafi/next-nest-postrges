"use client";
import React from 'react';
import { setAuthState } from "@/store/authSlice";
import { useAppDispatch } from "@/store";

const AuthUpdater = () => {
    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3002/auth/google/callback', {
            method: 'GET',
            credentials: 'include',
        });
    }

    return (
        <div className="flex gap-4 border border-1 border-black p-20">
            <button
                className="p-4 border border-1 border-black hover:bg-gray-300"
                onClick={handleLogin}
            >
                Log in
            </button>
            {/* <button
                className="p-4 border border-1 border-black hover:bg-gray-300"
                onClick={() => dispatch(setAuthState(false))}
            >
                Log out
            </button> */}
        </div>
    );
};

export default AuthUpdater;