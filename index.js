
require("dotenv").config()
const express = require("express")
const app = express()
const axios = require("axios").default


// template engine
app.set('view engine', 'ejs');

// simplified api 
var api = require("./routes/api.router.js")
app.use("/api", api)

// render index-article
app.get('/', function(req, res) {
    var query = req.query.query
    var sort = "newest"
    if (req.query.sort != null) {
        sort = req.query.sort
    }
    var page = 0
    if (req.query.page != null) {
        page = req.query.page
    } 

    // request data to api
    const host = process.env.HOST+":"+process.env.PORT
    axios.get(host+"/api/search?query="+query+"&sort="+sort+"&page="+page).then((response) => {
        var result = response.data.data
        res.render('pages/index', {result : result})
    })
})


// render book
app.get('/book', function(req, res) {
    var list = "hardcover-fiction" 
    if (req.query.list != null) {
        list = req.query.list
    }
    var offset = 0
    if (req.query.offset!=null) {
        offset = req.query.offset
    }

    const host = process.env.HOST+":"+process.env.PORT
    function getListName() {
        return axios.get(host+"/api/book/listname");
      }
      
    function getBooks() {
        return axios.get(host+"/api/book?list="+list+"&offset="+offset);
    }
      
    // multiple request
    Promise.all([getListName(), getBooks()]).then(function (results) {
          var listname = results[0];
          var book = results[1];
          res.render('pages/book', {listname : listname.data.data, book : book.data})
    });    


})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

