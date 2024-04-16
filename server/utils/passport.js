import session from "express-session";
import passport from "passport";
import { Strategy as googleStrategy } from "passport-google-oauth2";

const passportUtil = (app)=>{
    app.use(
        session({
            secret:process.env.SESSION_SECRET,
            resave:false,
            saveUninitialized:false,
            cookie:{
                maxAge: 1000*60*60*12 //12 hrs
            },
        })
    )
    app.use(passport.initialize())
    app.use(passport.session())


passport.use(
    new googleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:'/auth/google/callback',
        scope:['profile','email']
    },(acccessToken,refreshToken,profile,callback)=>{
        callback(null,profile)
    })
)

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})
}
export default passportUtil
