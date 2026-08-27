import { useState, useEffect } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import api from './services/testApi'
import guestApi from './services/guestApi.js'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Analytics from './pages/Analytics.jsx'
import Nav from './components/Nav.jsx'

function App() {
  const [data, setData] = useState('')
  const [isUser, setIsUser] = useState(false)

  const location = useLocation()

  useEffect(() => {
    const setGuest = async () => {
      await guestApi.setCookie(location.pathname)
    }
    // const getData = async () => {
    //   const result = await api.getTest()
    //   setData(result)
    // }
    // const getAuth = async () => {
    //   const result = await api.getAuth()
    //   if (result) {
    //     setIsUser(true)
    //   }
    // }
    // 
    // getAuth()
    // getData()
    setGuest()
  }, [location.pathname])

  const routes = useRoutes([
    {
      path:'/',
      element: <Home></Home>
    },
    {
      path:'/profile',
      element: <Profile></Profile> 
    },
    {
      path:'/login',
      element: <Login></Login>
    },
    {
      path:'/page/data',
      element: <Analytics></Analytics>
    }
  ])

  return (
    <>
      <div>
        {/* <h1>API OUTPUT: {data}</h1> */}
        <Nav></Nav>
        <br />
        {routes}
      </div>

    </>
  )
}

export default App
