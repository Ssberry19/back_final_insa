const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
require('dotenv').config();
const express = require('express');
const path = require('path');
const Controller = require('./controllers/controller');

const session = require('express-session');
const upload = require('./utils/uploadUtils');
dotenv.config({ path: './config.env' });


const app = express();
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 }
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

function isLoggedIn(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function fetchNewsData() {
    try {
        const response = await axios.get(process.env.NEWS_API_URL);
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching news data:', error);
        return [];
    }
}

if (!NEWS_API_KEY) {
    console.error('Please provide your News API key in the .env file.');
    process.exit(1);
}

const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

async function fetchNews() {
    try {
        const response = await axios.get(newsApiUrl);
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching news:', error.response.data);
        return [];
    }
}


async function displayNews() {
    const articles = await fetchNews();
    if (articles.length === 0) {
        console.log('No articles found.');
        return;
    }

    console.log('Latest news headlines:');
    articles.forEach((article, index) => {
        console.log(`${index + 1}. ${article.title}`);
        console.log(`   ${article.description}`);
        console.log(`   ${article.url}`);
        console.log();
    });
}

displayNews();

const DB = process.env.DATABASE;

mongoose
    .connect(DB.replace('<PASSWORD>', process.env.DATABASE_PASSWORD), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!'));

// Serve registration form
app.get('/register', (req, res) => res.render('register'));

// Handle registration
app.post('/register', Controller.register);

app.get('/', (req, res) => res.redirect('/login'));
// Serve login form
app.get('/login', (req, res) => res.render('login'));

// Handle login
app.post('/login', Controller.login);

// Serve logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Serve home
app.get('/home', isLoggedIn, Controller.getAllPortfolioItems, (req, res) => {
    res.render('home', { user: req.session.user, posts: res.locals.data.portfolioItems });
});

app.get('/dashboard', isLoggedIn, Controller.getAllPortfolioItems, (req, res) => {
    res.render('dashboard', { user: req.session.user , posts: res.locals.data.portfolioItems});
});

app.post('/delete', Controller.deletePortfolioItem);

app.post('/newpost', upload.array('images', 3), Controller.addPortfolioItem);

app.post('/edit', upload.array('editimages', 3), Controller.editPortfolioItem);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
