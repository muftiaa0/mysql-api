exports.CREATE_PERSON_TABLE = 'CREATE TABLE persons (person_id int NOT NULL AUTO_INCREMENT, last_name varchar(255), first_name varchar(255), username varchar(255), PRIMARY KEY (person_id, username))';
exports.CONSTRAINT_PERSON_TABLE = 'alter table persons add constraint uq1 unique (username)';

// get all people
exports.GET_ALL_PERSONS = 'SELECT * From persons';

// get a single person based off their id or username
exports.GET_PERSON = 'SELECT * FROM persons where person_id = ?';
exports.GET_PERSON_ID_FROM_USERNAME = 'SELECT person_id FROM persons where username = ?';
exports.GET_PERSON_FROM_USERNAME = 'SELECT * FROM persons where username = ?';

// delete a person from their ID
exports.DELETE_PERSON = 'DELETE FROM persons where person_id = ?';

// create a person
exports.CREATE_PERSON = 'INSERT INTO Persons (last_name, first_name, username) VALUE (?, ?, ?)';

// update a person
exports.UPDATE_PERSON = 'UPDATE persons SET last_name = ?, first_name = ? where person_id = ?';