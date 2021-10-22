#Pre-Note:
- The whole application server is developed using Node.js and tested on postman.
- SQL SERVER is used for creating the database and storing the translations.
- Translation API used in this project is google translation API and is fetched from Rakuten API provider.
- API's limit is 500 words/month on free tire.
# 1. Installation and Running the API

- **npm install** will install all the package dependencies.
- **npm start** will start the server at localhost port 3030.

# 2. Passing data to the API

- Example api link http://localhost:3030/en/es along with the api we pass source language and target language designed
  as specified in the assignment documentation.
- The text will be passed from the body as a json object.
- Example:  
  {  
  "text" : "This is new translation"  
  }
- once click on send the api will then send a get request to the server and translates the text from given language to
  the target language.

