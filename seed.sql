DROP DATABASE IF EXISTS butter;
CREATE DATABASE butter;

\c butter;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  birthname VARCHAR NOT NULL,
  username VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  profile_img VARCHAR NULL,
  birthday VARCHAR NULL,
  joining_reason VARCHAR NULL,
  followers_number INT NULL,
  followings_number INT NULL,
  firebase_uid VARCHAR NOT NULL
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  topic_name VARCHAR NOT NULL,
  image_url VARCHAR NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_posted_id INT REFERENCES users(id) NOT NULL,
  tag_id INT REFERENCES tags(id) NULL,
  content_url VARCHAR NOT NULL,
  title VARCHAR NULL,
  summary VARCHAR NULL,
  caption VARCHAR NULL,
  likes INT NULL,
  comments INT NULL
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_commented_id INT REFERENCES users(id) NOT NULL,
  post_commented_id INT REFERENCES posts(id) NOT NULL,
  comment VARCHAR NOT NULL
);

CREATE TABLE follows (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_follower_id INT REFERENCES users(id) NOT NULL,
  user_following_id INT REFERENCES users(id) NOT NULL
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_like_id INT REFERENCES users(id) NOT NULL,
  post_like_id INT REFERENCES posts(id) NOT NULL
);

CREATE TABLE saved_posts (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_saved_id INT REFERENCES users(id) NOT NULL,
  post_saved_id INT REFERENCES posts(id) NOT NULL
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_action_id INT REFERENCES users(id) NOT NULL,
  notification_type VARCHAR NOT NULL,
  follower_action_id INT REFERENCES follows(id) NULL,
  like_action_id INT REFERENCES likes(id) NULL,
  comment_action_id INT REFERENCES comments(id) NULL,
  user_received_action_id INT REFERENCES users(id) NOT NULL
);

INSERT INTO tags (topic_name, image_url) VALUES
('Shame', 'https://image.flaticon.com/icons/svg/89/89518.svg'),
('Sex', 'https://image.flaticon.com/icons/svg/1469/1469446.svg'),
('Insecurity', 'https://image.flaticon.com/icons/svg/1008/1008859.svg'),
('Relationships', 'https://image.flaticon.com/icons/svg/1189/1189170.svg'),
('Pleasure', 'https://image.flaticon.com/icons/svg/1469/1469432.svg'),
('Friendships', 'https://image.flaticon.com/icons/svg/1189/1189206.svg'),
('Contraceptions', 'https://image.flaticon.com/icons/svg/1012/1012725.svg'),
('Abortion', 'https://image.flaticon.com/icons/svg/113/113860.svg'),
('Pregnancy', 'https://image.flaticon.com/icons/svg/819/819058.svg'),
('Toys', 'https://image.flaticon.com/icons/svg/1463/1463353.svg'),
('Fantasy', 'https://image.flaticon.com/icons/svg/1504/1504140.svg'),
('Sexual Risks', 'https://image.flaticon.com/icons/svg/633/633571.svg'),
('STDS', 'https://image.flaticon.com/icons/svg/626/626513.svg'),
('Communication', 'https://image.flaticon.com/icons/svg/1078/1078011.svg'),
('HIV/AIDS', 'https://image.flaticon.com/icons/svg/35/35647.svg'),
('QTPOC', 'https://image.flaticon.com/icons/svg/55/55693.svg'),
('LATINOS', 'https://image.flaticon.com/icons/svg/1533/1533605.svg'),
('LGBTQIA', 'https://image.flaticon.com/icons/svg/1189/1189186.svg'),
('Sexual Health', 'https://image.flaticon.com/icons/svg/883/883360.svg'),
('Menstruation', 'https://image.flaticon.com/icons/svg/588/588084.svg'),
('Anal', 'https://image.flaticon.com/icons/svg/947/947768.svg'),
('Identity', 'https://image.flaticon.com/icons/svg/149/149240.svg'),
('Menopause', 'https://image.flaticon.com/icons/svg/263/263129.svg'),
('Dating', 'https://image.flaticon.com/icons/svg/1090/1090846.svg'),
('Technology', 'https://image.flaticon.com/icons/svg/149/149379.svg'),
('BDSM', 'https://image.flaticon.com/icons/svg/1538/1538781.svg');

INSERT INTO users (birthname, username, email, profile_img, birthday, joining_reason, followers_number, followings_number, firebase_uid) VALUES
('Pamela', 'abrpam', 'pamela@pamela.org', 'https://i.imgur.com/3hX8kUS.jpg', '10261996', 'Talking about these conversations is important to me!', 2, 2, 'somethingToken'),  
('Jo', 'designdyke', 'jo@jo.com', 'https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/images/2017/10/terrier-puppy.jpg?itok=rIgh3ArV&fc=50,50', '08111996', 'This is so cool!', 1, 1, 'somethingToken'),
('Rupa', 'rupa1216', 'rupa@rupa.com', 'https://williamsburgvets.com/wp-content/uploads/2018/03/bulldog-puppy-pic.jpg', '12161988', 'Why didnt this exist before?', 1, 1, 'somethingToken'),
('Thinx', 'thinx', 'thinx@thinx.com', 'https://mindbodygreen-res.cloudinary.com/images/w_767,q_auto:eco,f_auto,fl_lossy/ptr/QpbufLD/thinx.png', '12161988', 'A company like ours want to be a part of this conversation', 0, 0, 'somethingToken');

INSERT INTO posts (user_posted_id, tag_id, content_url, title, summary, caption, likes, comments) VALUES
(4, 20, 'https://www.welltodoglobal.com/wp-content/uploads/2018/08/thinx_2-web.jpg', 'Thinx', 'Innovative period-proof underwear brand THINX has launched into the UK, continuing its mission to break taboos surrounding women’s intimate wellness.', 'Break women’s intimate taboos', 0, 0),
(1, 3, 'http://b.parsons.edu/~abrep743/parsons/images/pam_d.jpg', 'Afraid', 'As much as Im smiling here, Im really anxious about never being perfect or good or accpeted.', 'Never being perfect enough',0, 2),
(2, 7, 'https://static.wixstatic.com/media/335c4d_7636a4c8d6a0452fb6f96cb30de0a066~mv2_d_3724_5586_s_4_2.jpg/v1/fill/w_498,h_748,al_c,q_85,usm_0.66_1.00_0.01/335c4d_7636a4c8d6a0452fb6f96cb30de0a066~mv2_d_3724_5586_s_4_2.webp', 'DAM', 'Unlike any other dental dams on the market, our dams are wearable, silicone, ergonomic and tongue textured.', 'Ever used a DAM?',3, 2);

INSERT INTO comments (user_commented_id, post_commented_id, comment) VALUES
(1, 3, 'I WANT ONE! ✋'),
(3, 3, 'ME TOO! 🙋🙋🙋'),
(2, 2, 'YO UR BEYOND PERFECT CHILL OUT'),
(3, 2, 'Dude IDK what u talking about ur flawless');

INSERT INTO follows (user_follower_id, user_following_id) VALUES
(1, 3),
(1, 2),
(2, 1),
(3, 1);

INSERT INTO likes (user_like_id, post_like_id) VALUES
(1, 3),
(3, 3),
(4, 3);

INSERT INTO saved_posts (user_saved_id, post_saved_id) VALUES
(1, 1),
(1, 3),
(3, 3);

INSERT INTO notifications (user_action_id, user_received_action_id, notification_type, follower_action_id, like_action_id, comment_action_id) VALUES
(1, 2, 'commented', NULL, NULL, 1),
(3, 2, 'commented', NULL, NULL, 2),
(2, 1, 'commented', NULL, NULL, 3),
(3, 1, 'commented', NULL, NULL, 4),
(1, 3, 'followed', 1, NULL, NULL),
(1, 2, 'followed', 2, NULL, NULL),
(2, 1, 'followed', 3, NULL, NULL),
(3, 1, 'followed', 4, NULL, NULL),
(1, 2, 'liked', NULL, 1, NULL),
(3, 2, 'liked', NULL, 2, NULL),
(4, 2, 'liked', NULL, 3, NULL);

