"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
require("./App.css");
const Auth_1 = require("./pages/Auth/Auth");
const Reg_1 = require("./pages/Reg/Reg");
const Layout_1 = require("./pages/Layout/Layout");
const Home_1 = require("./pages/Home/Home");
function App() {
    return (<react_router_dom_1.Routes>
      <react_router_dom_1.Route path='/' element={<Layout_1.Layout />}>
        <react_router_dom_1.Route path='/home' element={<Home_1.Home />}/>
      </react_router_dom_1.Route>
      <react_router_dom_1.Route path='/auth' element={<Auth_1.Auth />}/>
      <react_router_dom_1.Route path='/reg' element={<Reg_1.Reg />}/>
    </react_router_dom_1.Routes>);
}
exports.default = App;
