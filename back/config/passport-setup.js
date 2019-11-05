const passport = require('passport')
const googleStrategy = require('passport-google-oauth')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

passport.use(
    new googleStrategy({
    //options for google strategy
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET
}, () => {
   // passport callback function
    

})
)