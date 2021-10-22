## Creating the Table 
- CREATE TABLE Translations  
(  
    Text           VARCHAR(100)  NOT NULL,  
    TranslatedText VARCHAR(1000) NOT NULL,  
    SourceLanguage VARCHAR(2)    NOT NULL,  
    TargetLanguage VARCHAR(2)    NOT NULL,  
);

##Creating Procedure for inserting translated text into the database
- CREATE PROCEDURE InsertTranslated @Text VARCHAR(1000), @TranslatedText VARCHAR(1000), @SourceLanguage VARCHAR(2), @TargetLanguage VARCHAR(2)  
AS  
INSERT INTO Translations  
VALUES (@Text, @TranslatedText, @SourceLanguage, @TargetLanguage);  
GO;  

## Creating procedure for checking if the translation is available in the database
- CREATE PROCEDURE IsFound @Text VARCHAR(1000), @TranslatedText VARCHAR(1000), @SourceLanguage VARCHAR(2), @TargetLanguage VARCHAR(2)  
AS  
SELECT * FROM Translations  
WHERE Text=@Text AND SourceLanguage=@SourceLanguage And TargetLanguage=@TargetLanguage  
GO;  

## Extracting old translation from the database instead of sending an api request through online
- CREATE PROCEDURE OldTranslationCache @Text VARCHAR(1000), @SourceLanguage VARCHAR(2), @TargetLanguage VARCHAR(2)  
AS  
SELECT TranslatedText FROM Translations  
WHERE Text=@Text AND SourceLanguage=@SourceLanguage And TargetLanguage=@TargetLanguage  
GO;  

## Testing stored procedures
- EXEC IsFound "okay", '', "en", 'hi';

- EXEC InsertTranslated "okay", "ठीक", "en", "hi";

- EXEC OldTranslationCache "I've Successfully completed the api.", "en", "es";


