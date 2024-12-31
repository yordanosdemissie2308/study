import React from 'react'

const SignUp = () => {
  return (
    <>
     <div className='flex justify-center flex-col items-center bg-slate-100 min-h-screen'>
        <div className='shadow rounded-3xl w-full max-w-md items-center justify-between flex p-10'>
            <h1 className='text-3xl font-bold text-center mb-6 p-5' >SignUp</h1>
            <form className='space-y-4' >
                <input type='text' placeholder='Username' 
              className="w-full px-4 py-2 border rounded-md  focus:ring-blue-500" 
              />
                <input type='text' placeholder='email' className="items-center px-4 py-2 border rounded-md "/>
                <input type='text' placeholder='Create Password' 
              className="w-full px-4 py-2 border rounded-md  focus:ring-blue-500" 
              />
               <input type='text' placeholder='Coform yourpassword' 
              className="w-full px-4 py-2 border rounded-md  focus:ring-blue-500" 
              />
              <button type='submit' className='bg-slate-400 p-5  items-center font-semibold justify-center'>Sign up</button>
              <p className='text-purple-300 hover:to-white'>I already have an account<a className='p-2 text-blue-400 underline'>Login</a></p>
            </form>
            </div>
            </div> 
    </>
  )
}

export default SignUp
