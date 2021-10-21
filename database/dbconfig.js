const config = {
    user: 'kk',
    password: 'kiran789',
    server: 'LAPTOP-6RGI9IHP',
    database: 'AdminDB',
    options: {
        trustedconnections: true,
        trustServerCertificate: true,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS'
    },
    port: process.env.PORT || 63449,
}

module.exports = config;