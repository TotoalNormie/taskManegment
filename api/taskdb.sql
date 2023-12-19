CREATE TABLE IF NOT EXISTS users(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(30) NOT NULL,
	identifier CHAR(64) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS projects(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	description VARCHAR(300) NOT NULL,
	owner_id INT NOT NULL,
	
	FOREIGN KEY (owner_id) REFERENCES users(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS workers(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	project_id INT NOT NULL,
	privilege SMALLINT UNSIGNED NOT NULL,
	user_id INT NOT NULL,
	
	CONSTRAINT CHK_privs CHECK (privilege >= 0 AND privilege <=1),
	FOREIGN KEY (user_id) REFERENCES users(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	project_id INT NOT NULL,
	name VARCHAR(20) NOT NULL,
	description VARCHAR(1000) NOT NULL,
	state SMALLINT UNSIGNED NOT NULL,
	assignee INT,
	
	CONSTRAINT CHK_state CHECK (state >= 0 AND state <=2),
	FOREIGN KEY (assignee) REFERENCES workers(ID) ON DELETE CASCADE
);