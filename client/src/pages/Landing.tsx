import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Welcome to Store Rating Platform
      </h1>
      <div className="flex gap-4">
        <Button onClick={() => navigate("/signup")}>Sign Up</Button>
        <Button variant="outline" onClick={() => navigate("/signin")}>
          Sign In
        </Button>
      </div>
    </div>
  );
};
