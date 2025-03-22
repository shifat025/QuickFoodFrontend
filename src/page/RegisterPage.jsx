import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RegisterForm from "../components/auth/SignupForm";

export default function RegisterPage() {
  
  return (
    <main className="bg-white text-gray-800 ">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex min-h-screen max-h-screen">
        
        {/* Left side  */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center items-center jus p-12 h-full fixed left-0 top-0">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-1">Join Our Restaurant Network</h2>
            <p className="text-xl mb-4 font-medium">
              Enhance Your Dining Experience
            </p>
            <p className="mb-8 max-w-lg">
              Sign up to become part of our restaurant management system, where you can easily manage your menu, track orders, and provide a seamless dining experience for your customers. Simplify your operations and elevate your service today.
            </p>
          </div>
        </div>

        {/* Right side  */}
        <div className="fixed right-0 top-0 w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-6 lg:p-8 xl:p-12 overflow-y-auto xl:overflow-hidden">
          <div className="w-full max-w-lg ">
            <h2 className="text-3xl font-bold mb-3 flex gap-2 items-center">
              <span>Welcome to</span>
            </h2>
            <h1 className="text-4xl font-bold mb-6">Restaurant Sign Up</h1>

            <RegisterForm/>

            <div className="mt-2 text-gray-400">
              <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
