const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = process.env.PORT || 2000
const date = require(`${__dirname}/date.js`)

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))

app.set('view engine', 'ejs')

const items = []

app.get("/", function(req, res) {
  res.render("list", {
    title: date.getDate(),
    newListItem: items
  })
})

app.post("/", function(req, res) {
  const item = req.body.newItem
  items.push(item)
  res.redirect("/")
})

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
})
