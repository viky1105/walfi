import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole } from "lucide-react";

import Container from "../../../shared/components/ui/Container/Container";
import Card from "../../../shared/components/ui/Card/Card";
import Logo from "../../../shared/components/ui/Logo/Logo";

const ACCESS_CODES = ["WALFI2026", "SOLCOPYBOT"];
const ACCESS_STORAGE_KEY = "walfi_access_granted";

export default function AccessPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem(ACCESS_STORAGE_KEY) === "true") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedCode = code.trim().toUpperCase();

    if (ACCESS_CODES.includes(normalizedCode)) {
      localStorage.setItem(ACCESS_STORAGE_KEY, "true");
      navigate("/login", { replace: true });
      return;
    }

    setError(
      "That access code is not valid. Please request an invite from the team.",
    );
  };

  return (
    <Container>
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-violet-700/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <Card className="relative w-full max-w-md border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          <div className="flex justify-center">
            <Logo />
          </div>

          <div className="mt-8 flex justify-center rounded-full border border-violet-500/20 bg-violet-500/10 p-3 text-violet-300">
            <LockKeyhole size={24} />
          </div>

          <h1 className="mt-6 text-center text-3xl font-black tracking-tight text-white">
            Access Required
          </h1>

          <p className="mt-3 text-center text-sm leading-6 text-slate-400">
            Enter your invite code to continue to the login page.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label
              className="block text-sm font-medium text-slate-300"
              htmlFor="access-code"
            >
              Invite code
            </label>
            <input
              id="access-code"
              type="text"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              placeholder="Enter your access code"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-violet-500"
            />

            {error ? <p className="text-sm text-rose-400">{error}</p> : null}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500"
            >
              Continue
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Only approved users can access the platform.
          </p>
        </Card>
      </div>
    </Container>
  );
}
