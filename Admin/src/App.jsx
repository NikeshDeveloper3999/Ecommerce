import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Componets/Navbar'
import Sidebar from './Componets/Sidebar'
import {Routes, Route} from 'react-router-dom'
import List from './Pages/List'
import Add from './Pages/Add'
import Orders from './Pages/Orders'
import { useState } from 'react'
import Login from './Componets/Login'
import { useEffect } from 'react';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => { 
const [token ,settoken]  = useState(localStorage.getItem('token')?localStorage.getItem('token') :"");

useEffect(()=>{
localStorage.setItem('token' , token);
},[token])

console.log(token);
  return (
 <div className='bg-gray-50 min-h-screen '>
  <ToastContainer/>
{token === "" ? <Login  settoken={settoken}/> :

<>
<Navbar settoken={settoken} />
<hr />
<div className="flex w-full">
  <Sidebar/>
<div className="w-[70%] mx-auto ml-[max{5vw,25px }] my-8 text-gray-600 text-base ">
<Routes>
<Route path='/add' element={<Add token={token}/>  } />
<Route path='/list' element={<List token={token}/>} />
<Route path='/orders' element={<Orders token={token}/>} />
</Routes>
</div>
</div>
</>}
    </div>
  )
}

export default App
