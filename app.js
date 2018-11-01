const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
const mustacheExpress = require ('mustache-express')

app.use(bodyParser.urlencoded({ extended: false}))

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')






let movies = []

app.use(bodyParser.json())

app.post("/add-movie", function(req,res){
  let movieTitle = req.body.title
  let movieGenre = req.body.genre
  let movieDescription = req.body.description
  let movieposterURL = req.body.posterURL

  console.log(movieTitle)
  movies.push({movieTitle: movieTitle, movieGenre : movieGenre, movieDescription : movieDescription, movieposterURL : movieposterURL})
  res.redirect('/')
})






app.post('/remove-movie', function(req,res){
   let title = req.body.title
   console.log(title)
   movies = movies.filter(function(movie){
     return movie.title != title
   })
   res.render("remove-movie",{title:title})


})



app.get('/', function(req,res){

  res.render('index',{movies: movies})

})




app.listen(port,function(){
  console.log('running server.....')
})
