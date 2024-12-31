const Login = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white shadow-md rounded-3xl p-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Log In</h1>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="First Name" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">
              Log In
            </button>

          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?<a className="underline">Sign up</a>
            <a href="/signup" className='p-2 text-blue-400 underline'   >           Sign Up
            </a>
          </p>
        </div>
      </div>
    );
  };
  
  export default Login;
  