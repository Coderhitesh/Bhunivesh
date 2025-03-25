const express = require('express')
const app = express()
require('dotenv').config()
const Cors = require('cors')
const db = require('./db/db')
const PORT = process.env.PORT || 8123
const Router = require('./Routes/Routes')
app.use(Cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/admin-login', (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    const defaultEmail = process.env.ADMIN_EMAIL || "admin@gmail.com"
    const defaultPassword = process.env.ADMIN_PASSWORD || "prop@admin";

    console.log(defaultEmail)
    if (email === defaultEmail && password === defaultPassword) {

        res.json({ message: 'Login successful', login: true })
    } else {
        res.status(401).json({ message: 'Invalid credentials' })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

app.get('/', (req, res) => {
    res.send('Hello World, this is a simple express app')
})

app.use('/api/v1', Router)


db()