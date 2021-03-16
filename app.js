const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

const app = express()
const port = 3000

// Set Templating Enginge
app.set('view engine', 'ejs')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Navigation
app.get('', (req, res)=> {
    res.render('index')
})

app.get('/register', (req, res)=> {
    res.render('register')
})

app.post('/register', urlencodedParser, [
    check('username', 'This username must me 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail(),
    check('password', 'Enter a Strong password with all use of combination of characters and Symbols')
        .isStrongPassword(),
    check('button', 'Registered').not().isEmpty().withMessage('Register Sucessfully')

], (req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const alert = errors.array()
        res.render('register', {
            alert
        })
    }else{
        const alert = errors.array()
        res.render('register', {
            alert
        })
    }
})

app.listen(port, () => console.info(`App listening on port: ${port}`))