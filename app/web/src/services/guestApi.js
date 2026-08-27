
const setCookie = async (path) => {
  const response = await fetch('/api/auth/set/guest', {
    method: 'POST',
    credentials: 'include',
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify({
      "path": path 
    })
  })

  const cookie = await response.json()
  return cookie
}

const getPageData = async () => {
  const response = await fetch('http://localhost:5173/api/auth/view/analytics')
  const data = await response.json()
  return data
}

export default {
  setCookie,
  getPageData 
}
