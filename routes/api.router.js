var router = require("express").Router()
const axios = require("axios").default

const key = process.env.KEY
var url = process.env.APIURL

router.get('/search', function (req, res) {

    var query = req.query.query
    var sort = req.query.sort
    var page = req.query.page

    // build url based nytimes api
    var param = "?api-key="+key+"&q="+query+"&sort="+sort+"&page="+page
    console.log(url+param)

    axios.get(url+param).then((response) => {

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

router.get('/book', function (req, res) {
    res.send('Book')
})
  
module.exports = router