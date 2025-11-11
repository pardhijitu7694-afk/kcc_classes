
const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const app = express()
const port = process.env.PORT || 3000;

const authRoute = require('./routes/auth')
const indexRoute = require('./routes/index')
const pagesRoute = require('./routes/pages')
const dashboardController = require('./controllers/dashboardController')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use layouts
app.use(expressLayouts);
app.set("layout", "layout"); // default layout.ejs


// Static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));
// app.use('/', dashboardController.getHomePage)
app.use('/', indexRoute)
app.use('/auth', authRoute)
app.use('/api', pagesRoute)



// 404 Page (must be last)
app.use((req, res) => {
  res.status(404).render("pages/404", { title: "Page Not Found" });
});


app.listen(port, (err) => {
  if (err) throw err;
  console.log("Application running on the port 3000")
})