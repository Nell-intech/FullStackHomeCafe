
require('dotenv').config()

const express = require('express')

const cors = require('cors')

const connectDB = require('./config/db')

const app = express()

connectDB()

const PORT = 8005

const cafeRoute = require('./routes/cafeRoutes.js')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const { authorize } = require('./middleware/authMiddleware')

app.use(express.json())

app.use(cors())

const { createEngine } = require('jsx-view-engine')

const methodOverride = require('method-override')

app.set('view engine', 'jsx')

app.engine('jsx', createEngine())

app.use(express.urlencoded({extended: true}))

app.use(methodOverride('_method'))

app.use(express.static('public'))

app.use((req,res,next)=> {
    console.log('inside middleware')
    console.log(`${req.method} ${req.path}`)     
    next()
})

// app.use('/', require('./routes/index'))
app.use('/homeCafe', cafeRoute )

app.use('/users', authorize, userRoutes)

app.use('/auth', authRoutes)

// Listen to the given port
app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})