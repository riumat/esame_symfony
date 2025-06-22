import React, { useState } from "react";
import { register } from "../../api/auth";
import { setToken } from "../../libs/storage";
import { useNavigate, Link } from "react-router";

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await register(email, password);
            setToken(response.token);
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.error || "Errore durante la registrazione");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto mt-16 bg-white shadow-lg rounded-lg p-8 flex flex-col gap-6"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Registrati</h2>
            {error && <p className="text-red-600 text-center">{error}</p>}
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    autoComplete="email"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    autoComplete="new-password"
                />
            </div>
            <button
                type="submit"
                className="bg-accent text-white font-semibold py-2 rounded hover:bg-accent/90 transition disabled:opacity-60"
            >
                Registrati
            </button>
            <p className="text-center text-sm mt-2">
                Hai già un account?{" "}
                <Link to="/login" className="text-accent hover:underline">
                    Accedi
                </Link>
            </p>
        </form>
    );
};

export default RegisterForm;