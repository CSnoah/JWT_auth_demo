import guestApi from '../services/guestApi.js'
import { useEffect, useState } from 'react'

const Analytics = () => {
  const [lytics, setLytics] = useState([])

  useEffect(() => {
    const getData = async () => {
      const data = await guestApi.getPageData()
      setLytics(data)
      console.log(data)
    }
    getData()
    console.log(`Lytics: ${lytics}`)
    // const data = await guestApi.getPageData()

    // setLytics(getData())
  }, [])

  return (
    <div>
      {/* <p>Page: {lytics.path}</p> */}
      {/* <p>Views: {lytics.views}</p> */}
      <h1>Page Analytics</h1>
      <br />
      {lytics.map((l) => {
        return (
          <div style={styles.lyticMap}>
            <p>Page: {l.path}</p>
            <p>Views: {l.views}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Analytics

const styles = {
  lyticMap: {
    border: '1px solid black',
    margin: '2px',
  }
}
