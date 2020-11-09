exports.CREATE_PERSON_TABLE = 'CREATE TABLE persons (PersonID int NOT NULL AUTO_INCREMENT, LastName varchar(255), FirstName varchar(255), UserName varchar(255), PRIMARY KEY (PersonID, UserName))';
exports.CONSTRAINT_PERSON_TABLE = 'alter table persons add constraint uq1 unique (UserName)';

// get all people
exports.GET_ALL_PERSONS = 'SELECT * From persons';

// get a single person based off their id or username
exports.GET_PERSON = 'SELECT * FROM persons where PersonID = ?';
exports.GET_PERSON_ID_FROM_USERNAME = 'SELECT PersonID FROM persons where username = ?';

// delete a person from their ID
exports.DELETE_PERSON = 'DELETE FROM persons where PersonID = ?';

// create a person
exports.CREATE_PERSON = 'INSERT INTO Persons (LastName, FirstName, UserName) VALUE (?, ?, ?);'

// update a person
exports.UPDATE_PERSON = 'UPDATE persons SET LastName = ?, FirstName = ? where PersonID = ?';