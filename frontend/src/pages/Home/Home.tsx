import { useEffect, useState } from "react"

interface Task {
    id: number;
    name: string;
    description: string;
}

export const Home = () => {
    const userName = sessionStorage.getItem('node-user_name')
    const access_token = sessionStorage.getItem(`node-${userName}-access_token`)
    const [userTasks, setUserTasks] = useState<Task[] | null>([])

    const getTasks = () => {
        fetch('http://localhost:5172/api/v1/getTasks', {
            method: 'GET',
            headers: {
                'Authorization': `${access_token}`
            },
            
        })
        .then(response => {
            if(response.status === 200) {
                response.json().then(data => {
                    setUserTasks(data.tasks)
                    console.log(data.tasks)
                })
            }
        })
    }

    useEffect(() => {
        getTasks()
    }, [])

    useEffect(() => {
        console.log(userTasks?.length ? userTasks[0].name : 'nema')
    }, [userTasks])

    return (
        <div>
            {
                userTasks && userTasks.length > 0 ? (
                    userTasks.map((task, key) => (
                        <p key={key}>{task.name}</p>
                    ))
                ) : (
                    <p>Задач нет</p>
                )
            }
        </div>
    )
}