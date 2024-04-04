import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
         <Routes>
             <Route path='/signin' element={<Signin/>}/>
             <Route path='/signup' element={<Signup/>}/>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
