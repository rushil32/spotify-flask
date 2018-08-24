DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS comments;


CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  spotify_id INTEGER UNIQUE,
  full_name TEXT NOT NULL,
  display_image TEXT
);

CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  body TEXT NOT NULL,
  track_id TEXT NOT NULL,
  track_name TEXT NOT NULL,
  artist TEXT,
  album TEXT,
  album_cover_sm TEXT,
  album_cover_md TEXT,
  album_cover_lg TEXT,
  room INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (room) REFERENCES rooms (id)
  FOREIGN KEY (author_id) REFERENCES users (id)
);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  body TEXT NOT NULL,
  post_id TEXT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES users (id)
  FOREIGN KEY (post_id) REFERENCES posts (id)
);

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  host INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  room_name TEXT NOT NULL,
  is_private TEXT NOT NULL DEFAULT 'false',
  FOREIGN KEY (host) REFERENCES users (id)
);

-- SEED DATA

INSERT INTO rooms (host, room_name)
VALUES (1, 'Rap Caviar');

INSERT INTO rooms (host, room_name)
VALUES (1, 'Back to the 90s');

INSERT INTO rooms (host, room_name)
VALUES (1, 'Throwbacks');

INSERT INTO rooms (host, room_name)
VALUES (1, 'Only bangers here');

INSERT INTO rooms (host, room_name)
VALUES (1, 'Jump around');

INSERT INTO rooms (host, room_name)
VALUES (1, 'Summer Chill');

INSERT INTO rooms (host, room_name)
VALUES (1, 'Awesome mixtape vol 1');

INSERT INTO rooms (host, room_name)
VALUES (1, 'Awesome mixtape vol 2');