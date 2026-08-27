import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/testApi.js'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fLogin, setfLogin] = useState('')

  const navigate= useNavigate()

  const handleEmail = (event) => {
    const { name, value } = event.target
    setEmail(value)
  }

  const handlePassword = (event) => {
    const { name, value } = event.target
    setPassword(value)
  }

  const login = async (event) => {
    // prevent page from reloading
    event.preventDefault()

    const data = await api.login(email, password)

    if (data.success) {
      setfLogin('Login Success')
      navigate(
        "/profile",
        {
          state: {
            email: email,
            password: password
          }
        }
      )
    } else {
      setfLogin('Login Failed')
    }

    // console.log(data)
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label>Email</label>
        <input type="text" name="name" onChange={handleEmail} />
        <br/>

        <label>Password</label>
        <input type="text" name="name" onChange={handlePassword} />

        <br/>
        <button>Submit</button>
      </form>
      <div>{fLogin}</div>


    </div>
  )
}

export default Login
