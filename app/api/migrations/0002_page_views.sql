-- Migration number: 0002 	 2026-08-26T06:04:46.396Z

CREATE TABLE page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guest_id TEXT NOT NULL,
    path TEXT NOT NULL,
    visited_at INTEGER NOT NULL
);
