var router = require("express").Router()
const axios = require("axios").default

const key = process.env.KEY
var url = process.env.APIURL

// api route for search article
router.get('/search', function (req, res) {

    var query = req.query.query
    var sort = req.query.sort
    var page = req.query.page

    // build url based nytimes api
    var endpoint="/svc/search/v2/articlesearch.json"
    var param = "?api-key="+key+"&q="+query+"&sort="+sort+"&page="+page
    console.log(url+endpoint+param)

    axios.get(url+endpoint+param).then((response) => {

        // transform json
        var article = response.data.response.docs.map(article => {
            return {
                web_url: article.web_url,
                snippet: article.snippet,
                source: article.source,
                headline: article.headline.main,
                pub_date: article.pub_date,
            }
        })

        var meta = response.data.response.meta

        var result = {
            data: article,
            meta: meta
        }
        
        res.send(result)
    })
})

// api route for list books
router.get('/book', function (req, res) {

    var list = req.query.list
    var offset = req.query.offset

    // build url based nytimes api
    var endpoint="/svc/books/v3/lists.json"
    var param = "?api-key="+key+"&list="+list+"&offset="+offset
    console.log(url+endpoint+param)

    axios.get(url+endpoint+param).then((response) => {

        // transform json
        var result = response.data.results.map(book => {
            return book.book_details[0]
        })
        res.send(result)

    })    

})

// api route for list books
router.get('/book/listname', function (req, res) {

    // build url based nytimes api
    var endpoint="/svc/books/v3/lists/names.json"
    var param = "?api-key="+key
    console.log(url+endpoint+param)

    axios.get(url+endpoint+param).then((response) => {

        // transform json
        var result = response.data.results.map(list => {
            return {
                list_name : list.list_name,
                list_name_encoded : list.list_name_encoded
            }
        })
        res.send({data : result})
        
    })    

})

  
module.exports = router