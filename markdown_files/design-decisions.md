## Designing Decisions of The project
- Server is developed in Node.js and Express.js with SQL Server as the database.
- To translate text from one language to another language, we require a translator, so we used google translate API and is fetched from rakuten api provider.
- Implementation of SQL server database to store the translations done by user. 
- Data in the database is persistent, means data won't be deleted when the server is stopped.
- Source and Target Languages are passed with the api link itself.
- output of the request will have  
i. Input Text  
ii. Translated Text  
iii. Source Language  
iv. Target Language
