const unirest = require("unirest");

// async function translate(sText, sLang, tLang) {
//     const unirest = require("unirest");
//     const requ = unirest("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
//     requ.headers({
//         "content-type": "application/x-www-form-urlencoded",
//         "accept-encoding": "application/gzip",
//         "x-rapidapi-key": "c40de59806mshe442cc30fb695dap1c012bjsn07d6843d2896",
//         "x-rapidapi-host": "google-translate1.p.rapidapi.com",
//         "useQueryString": true
//     });
//
//     requ.form({
//         "q": sText,
//         "target": tLang,
//         "source": sLang
//     });
//
//     let translatedText='';
//     requ.end(function (res) {
//         if (res.error) throw new Error(res.error);
//
//         console.log(res.body["data"]["translations"][0]['translatedText']);
//         translatedText = res.body["data"]["translations"][0]['translatedText'];
//     });
//
//     return translatedText;
// }


module.exports = {
    translate: translate
}


app.get('/', function (req, res) {
    let c = {...req.body};
    trn.translate(c).then(async result => {
        res.send(result);
    });
})