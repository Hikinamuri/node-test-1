import { useState } from "react"

export const Reg = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, event.target.name)
        const targetName = event.target.name
        const targetValue = event.target.value
        
        setUserData(prevState => ({
            ...prevState,
            [targetName]: targetValue
        }))
    }

    const logUserData = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        console.log(userData)
    }

    const saveUser = () => {
        fetch('http://localhost:5172/api/v1/getUser/')

    }

    return (
        <div>
            <p>Авторизация</p>
            <form action="" onSubmit={saveUser}>
                <input type="text" name='name' value={userData.name} onChange={inputChange}/>
                <input type="text" name='email' value={userData.email} onChange={inputChange}/>
                <input type="text" name='password' value={userData.password} onChange={inputChange}/>
                <button onClick={logUserData}>Click</button>
            </form>
        </div>
    )
}