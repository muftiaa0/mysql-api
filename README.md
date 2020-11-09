Week3 - API that can perform basic CRUD operations on a person stored in a mysql database.


API Overview:<br> 
/persons/ GET -- will retrieve all persons<br>
/persons/ POST -- will create a new username if LastName, FirstName, username is specified in body<br>
/persons/# GET -- will retrieve a specific person who has their ID = #<br>
/persons/# PUT -- will update a specific person who has their ID = # with a LastName and FirstName specified in the body<br>
/persons/# DELETE -- will delete a specific person who has their id = #<br>
