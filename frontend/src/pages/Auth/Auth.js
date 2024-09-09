"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const react_1 = require("react");
const Auth = () => {
    const [userData, setUserData] = (0, react_1.useState)({
        name: "",
        email: "",
        password: "",
    });
    const inputChange = (event) => {
        console.log(event.target.value, event.target.name);
        const targetName = event.target.name;
        const targetValue = event.target.value;
        setUserData(prevState => (Object.assign(Object.assign({}, prevState), { [targetName]: targetValue })));
    };
    const logUserData = (event) => {
        event.preventDefault();
        console.log(userData);
    };
    const saveUser = () => {
        fetch('http://localhost:5172/api/v1/getUser/')
            .then(response => response.json())
            .then(response => setData(response.message));
    };
    return (<div>
            <p>Авторизация</p>
            <form action="" onSubmit={saveUser}>
                <input type="text" name='name' value={userData.name} onChange={inputChange}/>
                <input type="text" name='email' value={userData.email} onChange={inputChange}/>
                <input type="text" name='password' value={userData.password} onChange={inputChange}/>
                <button onClick={logUserData}>Click</button>
            </form>
        </div>);
};
exports.Auth = Auth;
