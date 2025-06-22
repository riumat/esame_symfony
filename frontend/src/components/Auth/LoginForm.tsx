import React, { useState } from "react";
import { login } from "../../api/auth";
import { Link, useNavigate } from "react-router";
import { setToken } from "../../libs/storage";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(email, password);
      setToken(response.token);
      navigate("/");
    } catch (err) {
      setError("Credenziali non valide.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-16 bg-white shadow-lg rounded-lg p-8 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Accedi</h2>
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
          autoComplete="current-password"
        />
      </div>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-accent text-white font-semibold py-2 rounded hover:bg-accent/90 transition disabled:opacity-60"
      >
        {loading ? "Caricamento..." : "Accedi"}
      </button>
      <p className="text-center text-sm mt-2">
        Non hai un account?{" "}
        <Link to="/register" className="text-accent hover:underline">
          Registrati
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
