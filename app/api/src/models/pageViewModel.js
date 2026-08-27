const pageViewExists = async (c, guestId, path) => {
  const response = await c.env.D1
    .prepare(`
      SELECT 1
      FROM page_views
      WHERE guest_id = ?
        AND path = ?
      LIMIT 1
    `)
    .bind(
      guestId,
      path
    )
    .first();

  return response !== null;
};

const setPageView = async (c, guestId, path) => {
  const response = await c.env.D1
      .prepare(`
          INSERT INTO page_views (
              guest_id,
              path,
              visited_at
          )
          VALUES (?, ?, ?)
      `)
      .bind(
          guestId,
          path,
          Date.now()
      )
      .run();

  return response;
} 

const countPageViews = async (c) => {
  const response = await c.env.D1.prepare(`
    SELECT guest_id, path, COUNT(*) AS views
    FROM page_views
    GROUP BY path;`).all()

  return response.results;
}

export default {
  setPageView,
  countPageViews,
  pageViewExists 
}

