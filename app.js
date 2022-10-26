const express = require("express")
const bodyParser = require("body-parser")
const {
  MongoClient,
  ObjectId
} = require("mongodb");
const _ = require("lodash")
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 2000
const date = require(`${__dirname}/date.js`)
const uri = `mongodb+srv://deji-dd:${process.env.PASSWORD}@websites.pek4ozl.mongodb.net/?retryWrites=true&w=majority`;
const url = "mongodb://localhost:27017"
const client = new MongoClient(uri);

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

app.get("/", function(req, res) {
  res.redirect("/home")
})

app.get("/:listName", function(req, res) {
  async function run() {
    try {
      const database = client.db('Websites');
      const coll = database.collection('todolist');
      const listName = _.lowerCase(req.params.listName)
      const defaultItems = {
        name: listName,
        items: [{
            item: "Welcome to your to-do list!"
          },
          {
            item: 'Hit the + button to add a new item.'
          },
          {
            item: '<-- Hit this to remove an item'
          }
        ]
      }
      const func = await coll.findOne({
        name: listName
      })

      if (func) {
        res.render("list", {
          title: `${date.getDate()}<br>${_.upperFirst(listName)}`,
          newListItem: func.items,
          listName: listName,
        })
      } else {
        await coll.insertOne(defaultItems)
        res.redirect(`/${listName}`)
      }

    } catch (err) {
      console.dir(err);
    }
  }
  run()
})

app.post("/", function(req, res) {
  async function run() {
    try {
      const database = client.db('Websites');
      const coll = database.collection('todolist');
      const item = req.body.newItem
      const listName = req.body.button

      await coll.updateOne({
        name: listName
      }, {
        $push: {
          items: {
            item: item
          }
        }
      })

      res.redirect(`/${listName}`)

    } catch (err) {
      console.dir(err);
    }
  }
  run()
})

app.post("/delete", function(req, res) {
  async function run() {
    try {
      const database = client.db('Websites');
      const coll = database.collection('todolist');
      const result = JSON.parse(req.body.itemCheck)
      const item = result.item
      const listName = result.listName

      await coll.updateOne({
        name: listName
      }, {
        $pull: {
          items: {
            item: item
          }
        }
      })

      res.redirect(`/${listName}`)
    } catch (err) {
      console.dir(err);
    }
  }
  run()
})

app.post("/newList", function(req, res) {
  const listName = _.lowerCase(req.body.newList)

  res.redirect(`/${listName}`)
})

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
})
