import { useState } from "react"

export const Reg = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const targetName = event.target.name
        const targetValue = event.target.value
        
        setUserData(prevState => ({
            ...prevState,
            [targetName]: targetValue
        }))
    }

    const saveUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (userData.name.length <= 4 || userData.password.length < 8) {
            alert(`Слишком короткое поле ${userData.name.length <= 4 ? 'Имя' : ''}${userData.password.length < 8 ? 'Пароль' : ''} `)
            return;
        }

        fetch('http://localhost:5172/api/v1/saveUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (response.status === 409) {
                alert('Пользователь с таким email уже существует')
            }
            else if (!response.ok) {
                console.log('Error')
            }
            return alert('Регистрация успешна!')
        })
    }

    return (
        <div>
            <p>Регистрация</p>
            <form action="" onSubmit={saveUser}>
                <input type="text" name='name' value={userData.name} onChange={inputChange}/>
                <input type="email" name='email' value={userData.email} onChange={inputChange}/>
                <input type="password" name='password' value={userData.password} onChange={inputChange}/>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    )
}