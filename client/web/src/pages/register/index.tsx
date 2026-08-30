import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import useRegister from "../../hooks/useRegister";
import { StateError } from "../../exceptions/StateError";

function RegisterPage() {
  const { handleSubmit, user, handleInputChange, status } = useRegister();

  return (
    <div className="flex flex-row w-screen h-screen bg-[#151918] text-white">

      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-emerald-900 to-[#151918]">
        <div className="text-center p-12">
          <h1 className="text-5xl font-bold mb-4">Join Us</h1>
          <p className="text-gray-300 text-lg">Create your account and start your journey today.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm space-y-6">
          
          <div className="text-left">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-gray-400 mt-2">Sign up to get started.</p>
          </div>

          <form className="space-y-4" onSubmit={(event) => {
            event.preventDefault();
          }}>
            <div>
              {status instanceof StateError ? (
                <p className="mb-2 text-sm text-red-400">{status.errorMessage}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <TextInput
                type="text"
                placeholder="janedoe"
                name="username"
                value={user.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fullname</label>
              <TextInput
                type="text"
                placeholder="janedoe"
                name="fullname"
                value={user.fullname}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <TextInput
                type="email"
                placeholder="name@example.com"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <TextInput type="password" placeholder="••••••••" name="password" value={user.password} onChange={handleInputChange} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <TextInput type="password" placeholder="••••••••" name="confirmPassword" value={user.confirmPassword} onChange={handleInputChange} />
            </div>

            <Button type="submit" className="w-full" onClick={handleSubmit}>
              {status === "loading" ? <LoadingSpinner /> : "Sign in"}
            </Button>
          </form>

          <p className="text-center text-gray-400 text-sm">
            Already have an account? <a href="/login" className="text-white font-semibold hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;