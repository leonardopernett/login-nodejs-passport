const express  = require('express')
const morgan   = require('morgan')
const path     = require('path')
const app      = express()
const flash    = require('connect-flash')
const ejsMate  = require('ejs-mate')
const passport = require('passport')
const session = require('express-session')

// setting
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname,'views'))

//mongodb
require('./database')


//passport
require('./passport/local-auth.js')


//middlewre 
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(flash());

app.use(session({
     secret:'myfirstsession',
     resave:false,
     saveUninitialized: false

}))

app.use(passport.initialize())
app.use(passport.session())


app.use((req,res,next)=> {
     app.locals.signupMessage = req.flash('signupMessage')
     app.locals.signinMessage = req.flash('signinMessage');
     next()//continue la operacion
})


//route
app.use(require('./routes/index.js'))


//static
app.use(express.static(path.join(__dirname, 'public')))


//listen 
app.listen(app.get('port'), ()=> {
    console.log('server on port ', app.get('port'))
})