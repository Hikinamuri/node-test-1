import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/getUser/')
      .then(response => response.json())
      .then(response => setData(response.message))
  }, [])

  return (
    <>
      <p>
        {
          !data ? 'Loading...' : data
        }
      </p>
    </>
  )
}

export default App
