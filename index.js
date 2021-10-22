// requiring the packages

const db = require('./database/dboperations')
const bodyParser = require('body-parser');
const express = require('express');
const unirest = require("unirest");

const app = express();

// Configuring app to use body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Get request with source language and target language as required parameters
app.get('/:sLang/:tLang', function (req, res) {
    // console.log(req.params.sLang);
    // console.log(req.params.tLang);

    let c = {...req.body};
    let sText = c['text'];
    let sLang = req.params.sLang;
    let tLang = req.params.tLang;

    // Checking if requested translation is requested before
    db.isFound(sText, '', sLang, tLang).then(result => {

        // console.log(result);
        let oldTranslation;
        if (result[0].length === 0) {
            oldTranslation = false;
        } else {
            oldTranslation = true;
        }

        // console.log("In function isFound oldTranslation value is: " + oldTranslation);

        if (oldTranslation) {

            // console.log("In if block oldTranslation value is: " + oldTranslation);
            // console.log(result[0][0]['TranslatedText']);

            res.send(`Source Text: ${sText}\n Translated Text: ${result[0][0]['TranslatedText']}\nTranslated text from ${sLang} to ${tLang}`);

        } else {

            // API Request
            const requ = unirest("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");

            // Specifying headers
            requ.headers({
                "content-type": "application/x-www-form-urlencoded",
                "accept-encoding": "application/gzip",
                "x-rapidapi-key": "316ee34aacmshb54ff1d137d70a3p108458jsn74174fa48d8c",
                "x-rapidapi-host": "google-translate1.p.rapidapi.com",
                "useQueryString": true
            });

            // Configuring form
            requ.form({
                "q": sText,
                "target": tLang,
                "source": sLang
            });

             // Fetching translation from the google translate api
            requ.end(async function (ress) {
                if (ress.error) console.log(ress.error);

                let translatedText = await ress.body["data"]["translations"][0]['translatedText'];
                // console.log(ress.body["data"]["translations"][0]['translatedText']);

                // Inserting translation into the database
                db.insertTranslation(sText, translatedText, sLang, tLang).then(result => {
                    // res.status(201).send("Translation Added");
                    // console.log("uploded");

                });
                res.send(`Source Text: ${sText}\n Translated Text: ${translatedText}\nTranslated text from ${sLang} to ${tLang}`);


            });

        }
    });


});


// Listening from port 3030
app.listen(3030, function () {
    console.log('Server is running')
});