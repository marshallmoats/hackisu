-- DROP TABLE IF EXISTS user;
-- DROP TABLE IF EXISTS market;
-- DROP TABLE IF EXISTS img;
DROP TABLE IF EXISTS item;

-- CREATE TABLE user (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   username TEXT UNIQUE NOT NULL,
--   market_id INTEGER,
--   FOREIGN KEY (market_id) REFERENCES market(id)
-- );

-- CREATE TABLE market (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   market_name TEXT NOT NULL,
--   lat REAL,
--   long REAL,
--   desc TEXT,
--   start_time INTEGER,
--   end_time INTEGER
-- );

-- CREATE TABLE img (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   img_data BLOB
-- );

CREATE TABLE item (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  qty INTEGER,
  vendor INTEGER,
  price INTEGER,
  desc TEXT,
  img INTEGER,
  FOREIGN KEY (vendor) REFERENCES user(id),
  FOREIGN KEY (img) REFERENCES img(id)
);