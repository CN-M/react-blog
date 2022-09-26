import axios from 'axios'
import { useState, useEffect } from 'react'

const Show = () => {
  const [categories, setCategories] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {    
    const getCategories = async () => {
      const response = await axios.get('/categories')
      setCategories(response.data)
    }

    const getUsers = async () => {
      const response = await axios.get('/users')
      setUsers(response.data)
    }

    getCategories()
    getUsers()
  })

  return (
    <>
      <section>
          <ul>
            {
              categories.map(category => <li key={category.id}>{category.name}</li>)
            }
          </ul>
          <h1>Users</h1>
          <ul>
            {
              users.map(user => <li key={user.id}>{user.username}</li>)
            }
          </ul>
      </section>
    </>
  )
}

export default Show