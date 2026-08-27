import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div style={styles.navBox}>
      <Link style={styles.link} to="/">Home</Link>
      <Link style={styles.link} to="/profile">Profile</Link>
      <Link style={styles.link} to="/login">Login</Link>
      <Link style={styles.link} to="/page/data">Page Analytics</Link>
    </div>
  )
}

export default Nav

const styles = {
  navBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '5px',
    // border: '1px solid black',
    paddingRight: '10px',
  },
  link: {
    border: '1px solid black',
    borderRadius: '5px',
    padding: '10px',
    margin: '5px',
  }
}
