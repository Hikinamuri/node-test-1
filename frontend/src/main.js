"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const App_tsx_1 = __importDefault(require("./App.tsx"));
require("./index.css");
const store_ts_1 = require("./store/store.ts");
(0, client_1.createRoot)(document.getElementById('root')).render(<react_1.StrictMode>
    <react_redux_1.Provider store={store_ts_1.store}>
      <react_router_dom_1.BrowserRouter>
        <App_tsx_1.default />
      </react_router_dom_1.BrowserRouter>
    </react_redux_1.Provider>
  </react_1.StrictMode>);
