# Test-cases

- ###Get request: 
- http://localhost:3030/en/es  
  body of type json  
  {  
  "text" : "This is new translation"  
  }
- ### output
- Source Text: This is new translation 
  Translated Text: Esta es una nueva traducción  
  Translated text from en to es

----

- ### Get request: 
- http://localhost:3030/es/fr  
  body of type json  
  {  
  "text" : "Esta es una nueva traducción"
  }
- ### output
- Source Text: Esta es una nueva traducción  
  Translated Text: Ceci est une nouvelle traduction  
  Translated text from es to fr  

----

- ### Get request:
- http://localhost:3030/fr/en  
  body of type json  
  {  
  "text" : "Ceci est une nouvelle traduction"  
  }  
- ### output
- Source Text: Esta es una nueva traducción  
  Translated Text: This is new translation  
  Translated text from fr to en 
