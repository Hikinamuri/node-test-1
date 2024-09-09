import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Auth = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
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

    const authUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (userData.password.length < 8) {
            alert(`Слишком короткое поле Пароль`)
            return;
        }

        fetch('http://localhost:5172/api/v1/authorization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (response.status === 401) {
                return alert('Неправильынй логин или пароль')
            }
            else if (response.status === 400) {
                return response.json().then(data => {
                    alert(data.message)
                })
            }
            else if (!response.ok) {
                console.log('Error')
            }
            response.json().then(data => {
                sessionStorage.setItem('node-user_name', data.userName)
                sessionStorage.setItem(`node-${data.userName}-access_token`, data.token)
            })
            return alert('Авторизация успешна!'), navigate('/home')
        })
    }

    return (
        <div>
            <p>Авторизация</p>
            <form action="" onSubmit={authUser}>
                <input type="email" name='email' value={userData.email} onChange={inputChange}/>
                <input type="password" name='password' value={userData.password} onChange={inputChange}/>
                <button type="submit">Авторизоваться</button>
            </form>
        </div>
    )
}