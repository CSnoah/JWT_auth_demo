const getTest = async () => {
  const response = await fetch (`/api/hello`)
  const data = await response.text()
  return data
}

const getAuth = async () => {
  const response = await fetch (`/api/auth/authRoute`)
  const data = await response.json()
  return data
}

const login = async (email, password) => {
  const response = await fetch ('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  const data = await response.json()
  return data
}

export default {
  getTest,
  getAuth,
  login
}
