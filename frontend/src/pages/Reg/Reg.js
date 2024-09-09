"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reg = void 0;
const react_1 = require("react");
const Reg = () => {
    const [userData, setUserData] = (0, react_1.useState)({
        name: "",
        email: "",
        password: "",
    });
    const inputChange = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;
        setUserData(prevState => (Object.assign(Object.assign({}, prevState), { [targetName]: targetValue })));
    };
    const saveUser = (event) => {
        event.preventDefault();
        fetch('http://localhost:5172/api/v1/saveUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(data => {
            console.log(data);
        });
    };
    return (<div>
            <p>Регистрация</p>
            <form action="" onSubmit={saveUser}>
                <input type="text" name='name' value={userData.name} onChange={inputChange}/>
                <input type="text" name='email' value={userData.email} onChange={inputChange}/>
                <input type="text" name='password' value={userData.password} onChange={inputChange}/>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>);
};
exports.Reg = Reg;
