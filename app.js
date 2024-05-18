const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.listen(3000, () => {
    console.log('Listening on port 3000');
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

// redirect

app.get('/about-us', (req, res) => {
    res.render('about')
})

// 404

app.use((req, res) => {
    res.status(404).render('404')
})