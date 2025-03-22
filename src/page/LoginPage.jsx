import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex min-h-screen">
        {/* Left side */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 text-white">
          <div>
            <h2 className="text-4xl font-extrabold mb-4">Welcome to Restaurant Management</h2>
            <p className="text-xl mb-6">Manage Orders, Menus, and More with Ease</p>
            <p className="text-lg mb-6">
              Sign in to access the dashboard where you can manage restaurant operations, track orders, and streamline your business workflow.
              Keep your team on track and ensure seamless service every day.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            
            <h1 className="text-5xl font-bold mb-6 text-center">Sign In</h1>

            <LoginForm />

            <div className="text-center mt-6">
              <a href="#" className="text-primary text-lg hover:underline">
                Forgot Password?
              </a>
            </div>

            <div className="mt-8 text-center">
              <p className="text-lg">
                No Account?{" "}
                <Link to="/register" className="text-primary font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
