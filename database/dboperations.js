const config = require('./dbconfig');
const sql = require('mssql');


async function insertTranslation(sText, tText, sLang, tLang) {
    try {
        let pool = await sql.connect(config);
        let orders = await pool.request()
            .input('Text', sql.NVarChar, sText)
            .input('TranslatedText', sql.NVarChar, tText)
            .input('SourceLanguage', sql.NVarChar, sLang)
            .input('TargetLanguage', sql.NVarChar, tLang)
            .execute('InsertTranslated');
        console.log(orders.recordsets);
        return orders.recordsets;
    } catch (error) {
        throw error;
    }
}

async function isFound(sText, tText, sLang, tLang) {
    try {
        let pool = await sql.connect(config);
        let orders = await pool.request()
            .input('Text', sql.NVarChar, sText)
            .input('TranslatedText', sql.NVarChar, tText)
            .input('SourceLanguage', sql.NVarChar, sLang)
            .input('TargetLanguage', sql.NVarChar, tLang)
            .execute('IsFound');
        console.log(orders.recordsets[0].length);
        return orders.recordsets;
    } catch (error) {
        throw error;
    }
}

async function getOldTranslation(sText, sLang, tLang) {
    try {
        let pool = await sql.connect(config);
        let orders = await pool.request()
            .input('Text', sql.NVarChar, sText)
            // .input('TranslatedText', sql.NVarChar, tText)
            .input('SourceLanguage', sql.NVarChar, sLang)
            .input('TargetLanguage', sql.NVarChar, tLang)
            .execute('OldTranslationCache');
        console.log(orders.recordsets[0].length);
        return orders.recordsets;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    insertTranslation: insertTranslation,
    isFound: isFound,
    getOldTranslation: getOldTranslation
}
