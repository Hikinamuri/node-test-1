import {Routes, Route} from "react-router-dom";
import './App.css'
import { Auth } from './pages/Auth/Auth';
import { Reg } from './pages/Reg/Reg';
import { Layout } from './pages/Layout/Layout';
import { Home } from './pages/Home/Home';

function App() {
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
