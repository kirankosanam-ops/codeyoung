// requiring the packages
// const trn = require('./model/translate');
// const Coupon = require("./models/couponmodel");
const db = require('./database/dboperations')
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const unirest = require("unirest");
const app = express();
const router = express.Router();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    let c = {...req.body};
    let sText = c['text'], sLang = c['fromLanguage'], tLang = c['toLanguage']
    db.isFound(sText, '', sLang, tLang).then(result => {

        console.log(result);
        let oldTranslation;
        if (result[0].length === 0){
            oldTranslation = false;
        }else{
            oldTranslation = true;
        }
        console.log("In function isFound oldTranslation value is: " + oldTranslation);
        if (oldTranslation) {
            console.log("In if block oldTranslation value is: " + oldTranslation);
            res.send("Old Translation");

        }
        else {
            const unirest = require("unirest");
            const requ = unirest("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
            requ.headers({
                "content-type": "application/x-www-form-urlencoded",
                "accept-encoding": "application/gzip",
                "x-rapidapi-key": "316ee34aacmshb54ff1d137d70a3p108458jsn74174fa48d8c",
                "x-rapidapi-host": "google-translate1.p.rapidapi.com",
                "useQueryString": true
            });


            requ.form({
                "q": sText,
                "target": tLang,
                "source": sLang
            });

            requ.end(async function (ress) {
                if (ress.error) console.log(ress.error);

                translatedText = await ress.body["data"]["translations"][0]['translatedText'];
                console.log(ress.body["data"]["translations"][0]['translatedText']);


                db.insertTranslation(sText, translatedText, sLang, tLang).then(result => {
                    // res.status(201).send("Coupon Added");
                    console.log("uploded");

                });
                res.send(`Source Text: ${sText}\n Translated Text: ${translatedText}\nTranslated text from ${sLang} to ${tLang}`);


            });

        }
    });


});


app.listen(3030, function () {
    console.log('Server is running')
});