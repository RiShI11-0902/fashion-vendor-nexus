
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useStore. } from "../../stores/useAuthStore";
import MainLayout from "../../components/layout/MainLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";
import google from "../../assets/google.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      await signup(email, password, name);
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to create an account");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
   const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_DEV_BACKEND_URL}/api/auth/google`;
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gray-50">
  <Card className="w-full max-w-lg mx-auto shadow-lg rounded-xl overflow-hidden">
    <CardHeader className="flex flex-col items-center space-y-2 py-6 px-4 sm:px-6 bg-white">
      <img className="w-32 sm:w-40 mb-2" src="/full_logo.png" alt="Shop Monk Logo" />
      <CardTitle className="text-2xl sm:text-3xl font-display text-gray-900 text-center">
        Create an Account
      </CardTitle>
      <CardDescription className="text-center text-gray-600">
        Enter your information to create a vendor account
      </CardDescription>
    </CardHeader>

    <CardContent className="px-4 sm:px-6 py-6">
      {error && (
        <div className="bg-red-100 text-red-700 text-sm p-3 rounded-md mb-4 text-center">
          {error}
        </div>
      )}

      <Button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 mb-5 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100"
      >
        <img className="w-5" src={google} alt="Google Logo" />
        Login With Google
      </Button>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <Button type="submit" className="w-full py-2" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </div>
      </form>
    </CardContent>

    <CardFooter className="flex justify-center py-4 bg-gray-50">
      <div className="text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-gold hover:underline font-medium">
          Sign in
        </Link>
      </div>
    </CardFooter>
  </Card>
</div>

      {/* <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-2 flex flex-col items-center">
            <div className="flex items-center mb-2">
              <img className="w-40" src={"/full_logo.png"} alt="" srcset="" />
            </div>
            <CardTitle className="text-2xl font-display">Create an Account</CardTitle>
            <CardDescription>
              Enter your information to create a vendor account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            <Button onClick={handleGoogleLogin} className="mx-auto w-full  flex items-center justify-center">
              Login With Google
              <img className="w-5" src={google} alt="" srcset="" />
            </Button>
            <form onSubmit={handleSubmit} className="gap-2 mt-5 grid-cols-2 grid items-center justify-center">
              <div className="">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <div className="">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center mx-auto  ">
            <div className="text-sm text-gray-600 mx-auto w-fit">
              Already have an account?{" "}
              <Link to="/login" className="text-gold hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div> */}
    </MainLayout>
  );
};

export default Signup;
