/* ===================
    Main
   =================== */

module.exports = {
    development: {
        root: __dirname,
        db: 'mongodb://localhost/test',
        /* TODO: Add your db route */
        realm: 'http://localhost:5000/',
    },
    test: {
        root: __dirname,
        db: 'mongodb://localhost/test',
        /* TODO: Add your db route */
        realm: 'http://localhost:5000/',
    },
    staging: {
        root: __dirname,
        db: process.env.MONGOLAB_URI,
        realm: 'http://yourdomain/',
        /* TODO: Change to your own domain */
    },
    production: {
        root: __dirname,
        db: process.env.MONGOLAB_URI,
        realm: 'http://yourdomain/',
        /* TODO: Change to your own domain */
    }
}