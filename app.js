//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require('lodash');
const homeStartingContent = "Hello EveryOne Pranav Dhiman here , welcome to my blog !! I am thrilled to announce the launch of my brand new blog dedicated to the world of technology! As an avid tech enthusiast, I have always been captivated by the endless possibilities that emerge from the rapidly evolving tech landscape. With this blog, I aim to share my passion for the latest technological advancements, insightful reviews, and intriguing news that shape our digital future. ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.render("home", {
    homeContent:homeStartingContent,
    Contentposts:posts
    
  });
  
});

app.get("/about", function(req, res) {
  res.render("about", {aboutParagraph:aboutContent });
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactParagraph:contactContent });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/posts/:topic" , function(req,res) //so basically this is called route parameter which means that after url/posts/ whatever u write page will be created for that and that value will be stored in variable which is passed here it is topic and then that topic we can use or console log 
{
  const topicID=_.lowerCase(req.params.topic); //lowercase + tell the topic that is entered.
  posts.forEach(function(post) //this is equivalent to for lopp , in js we use this this will check for that the entered title and the exisiting titles are same or not
  {
    const storedTitle=_.lowerCase(post.Title); // we do this lowercase so that if anyone just types the upperCase title or the url is in uppercase or it have any "-" btw them all can become equal
    const storedBody=(post.body);
    
    if (storedTitle===topicID) {
      console.log("Match Found");
      res.render("post", { postTitle:storedTitle , postBody:storedBody})
    }
    else
    {
      console.log("Match Not Found");
    }
  });
});




app.post("/compose",function(req,res)
{
  const ContentObject ={
    Title:req.body.postTitle,
    body:req.body.postBody
  }
  posts.push(ContentObject);
  res.redirect("/");
  
} )




app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
