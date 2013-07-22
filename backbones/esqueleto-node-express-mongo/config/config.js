/* ===================
    Main
   =================== */

module.exports = {
  development: {
    root: __dirname,
    db: 'mongodb://localhost/test' /* TODO: Add your db route */
  },
  test: {
    root: __dirname,
    db: 'mongodb://localhost/test' /* TODO: Add your db route */
  },
  staging: {
    root: __dirname,
    db: process.env.MONGOHQ_URL
  },
  production: {
    root: __dirname,
    db: process.env.MONGOHQ_URL
  }
}
