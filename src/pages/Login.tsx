
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      // Mock authentication - in a real app, this would validate against a backend
      if (email.includes("admin")) {
        // Admin login
        localStorage.setItem("userRole", "admin");
      } else {
        // Regular user login
        localStorage.setItem("userRole", "user");
      }
      
      localStorage.setItem("isAuthenticated", "true");
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-caffe-100 to-caffe-200 dark:from-caffe-800 dark:to-caffe-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-caffe-200 dark:bg-caffe-700 flex items-center justify-center mb-4">
            <Coffee className="h-6 w-6 text-caffe-600 dark:text-caffe-200" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Diners</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the monitoring system
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <div className="text-xs text-muted-foreground">
                Use any email with "admin" for admin access
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-xs text-primary hover:underline underline-offset-4"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <div className="text-xs text-muted-foreground">
                Use any password for demo purposes
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-caffe-500 hover:bg-caffe-600"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
