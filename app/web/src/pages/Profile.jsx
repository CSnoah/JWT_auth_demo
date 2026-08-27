import { useLocation } from 'react-router-dom'

const Profile = () => {
  const location = useLocation()

  return (
    <div>
      <h1>profile</h1>
      <p>email: {location?.state?.email}</p>
      <p>password: {location?.state?.password}</p>


    </div>
  )
}

export default Profile 
