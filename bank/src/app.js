const express = require("express")
const hbs = require("hbs")
const path = require("path")
const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname + '../public')));
app.set('view engine', "hbs")
app.set("views", path.join(__dirname, "../public/view"))
hbs.registerPartials(path.join(__dirname, "../public/view/layouts"))

const appRoutes = require('../app/routes/web.routes')
app.use(appRoutes)

app.get('*', (req, res) => res.render('404', { pageTitle: "error Page" }))

module.exports = app