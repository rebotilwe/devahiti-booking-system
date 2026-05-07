import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Waves, Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check (change this to a stronger password)
    if (password === "DevahitiAdmin2026") {
      localStorage.setItem("adminAuthenticated", "true");
      navigate("/admin");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Waves className="h-5 w-5 text-ocean" />
            <span className="text-xs tracking-widest uppercase text-ocean">Admin Access</span>
            <Waves className="h-5 w-5 text-ocean" />
          </div>
          <h1 className="font-heading text-2xl text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter password to access dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-ocean"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-ocean text-white rounded-lg hover:bg-ocean-dark transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}