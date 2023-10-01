const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_register_db'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexión a la base de datos establecida');
});

app.use(session({
    secret: 'secret-key',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.send('¡Bienvenido!');
});

app.get('/views/login', (req, res) => {
    res.render('Views/login');
});

app.post('/auth', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, (err, result) => {
                    if (result) {
                        req.session.loggedin = true;
                        req.session.username = username;
                        res.redirect('/home');
                    } else {
                        res.send('Usuario o contraseña incorrectos');
                    }
                });
            } else {
                res.send('Usuario no encontrado');
            }
        });
    } else {
        res.send('Por favor, ingresa usuario y contraseña');
    }
});

app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.send('¡Bienvenido de nuevo, ' + req.session.username + '!');
    } else {
        res.redirect('/login');
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.send('Error al encriptar la contraseña');
            } else {
                db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (error, results) => {
                    if (error) {
                        res.send('Error al registrar el usuario');
                    } else {
                        res.send('Registro exitoso, ahora puedes iniciar sesión');
                    }
                });
            }
        });
    } else {
        res.send('Por favor, ingresa usuario y contraseña');
    }
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
