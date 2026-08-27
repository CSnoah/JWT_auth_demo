const createUser = async (c, email, password) => {
  // const {name, email} = await c.req.json()
  
  const result = await c.env.D1.prepare(`
    INSERT INTO users (email, password_hash)
    VALUES(?,?)`).bind(email, password).run()

  return {
    id: result.meta.last_row_id,
    email: email
  };
  // return result
}

const getUser = async (c) => {
  const id = c.req.params('id')
  const result = await c.env.D1.prepare(`
    SELECT * FROM users WHERE id=?`).bind(id).run()
  return result
}

const findUser = async (c, email) => {
  const user = await c.env.D1.prepare(`
    SELECT * FROM users WHERE email=?`).bind(email).first()
  return user
}

export default {
  createUser,
  getUser,
  findUser,
}
