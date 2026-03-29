import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({settoken}) => {

const [email, setemail] = useState('')
const [password , setpassword] = useState('');


const onSubmitHandler = async (e)=>{
try{
e.preventDefault();
const response = await axios.post(backendUrl + '/api/admin/login' , {email,password});

if(response.data.success){
settoken(response.data.token);
console.log(response.data.token)
}else{
toast.error(response.data.message)
}

}catch(err){

    toast.error(err.message);
}
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>

        <form className="space-y-4" onSubmit={ onSubmitHandler}>
          {/* Email */}
          <div>
            <label  className="block mb-1 font-medium" htmlFor="email">Email Address</label>
            <input
             onChange={(e)=>setemail(e.target.value)}
             value={email}
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="password">Password</label>
            <input
             onChange={(e)=>setpassword(e.target.value)}
             value={password}
              id="password"
              type="password"

              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-600 transition"
          >Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;