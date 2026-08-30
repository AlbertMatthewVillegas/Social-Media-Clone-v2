import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import TextInput from "../../components/TextInput";
import { StateError } from "../../exceptions/StateError";
import useLogin from "../../hooks/useLogin";

function LoginPage() {
  const { handleSubmit, user, handleInputChange, status } = useLogin();
  return (
    <div className="flex flex-row w-screen h-screen bg-[#151918] text-white">
      
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-900 to-[#151918]">
        <div className="text-center p-12">
          <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
          <p className="text-gray-300 text-lg">Sign in to continue your journey with us.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm space-y-8">
          
          <div className="text-left">
            <h2 className="text-3xl font-bold">Login</h2>
            <p className="text-gray-400 mt-2">Enter your credentials to access your account.</p>
          </div>

          <form className="space-y-6" onSubmit={(event)=>event?.preventDefault()}>
            <div>
              {status instanceof StateError ? (
                <p className="mb-2 bg-red-600 text-sm rounded-md px-8 py-4">{status.errorMessage}</p>
              ) : null}
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <TextInput type="email" placeholder="name@example.com" onChange={handleInputChange} name="email" value={user.email}/>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <TextInput type="password" placeholder="••••••••" onChange={handleInputChange} name="password" value={user.password}/>
            </div>

            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {status === "loading" ? <LoadingSpinner /> : "Sign in"}
            </Button>
          </form>

          <p className="text-center text-gray-400 text-sm">
            Don't have an account? <a href="/register" className="text-white font-semibold hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;