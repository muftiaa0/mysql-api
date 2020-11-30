Week5 - API that can perform basic JWT authentication.


API Overview:<br> 
/auth/login POST -- will attempt to login and return an auth-token if successful<br>
/auth/createPerson POST -- will attempt to create a new person provided the username doesn't exist<br> 
/persons/me GET -- will retrieve information about the current user logged in provided their auth-token is valid<br>
/persons/me/updatePassword POST -- will make an update to a password for a given username.<br>
/persons/# DELETE -- will delete a specific person who has their id = # - LEGACY<br> 

Added login and createPerson tests<br>