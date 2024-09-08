import { useEffect, useState } from 'react'
import {Routes, Route} from "react-router-dom";
import './App.css'
import { Auth } from './pages/Auth/Auth';
import { Reg } from './pages/Reg/Reg';
import { Layout } from './pages/Layout/Layout';
import { Home } from './pages/Home/Home';

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5172/api/v1/getUser/')
      .then(response => response.json())
      .then(response => setData(response.message))
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/home' element={<Home />} />
      </Route>
      <Route path='/auth' element={<Auth />} />
      <Route path='/reg' element={<Reg />} />
    </Routes>
  )
}

export default App
