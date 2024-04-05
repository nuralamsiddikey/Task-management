import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import Task from './pages/Task';
import PrivateRoute from './PrivateRoutes';

function App() {
  

  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<PrivateRoute><Task/></PrivateRoute>}/>
             <Route path='/signin' element={<Signin/>}/>
             <Route path='/signup' element={<Signup/>}/>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
