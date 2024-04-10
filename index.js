const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require("uuid");
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true })); // parse application

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "divya",
    content:
      "The peace you can find in Krishn can never be found in anyone else.",
  },
  {
    id: uuidv4(),
    username: "vaishnavi",
    content: "The magic you are looking for is in the work you are avoiding.",
  },
  {
    id: uuidv4(),
    username: "shridha",
    content:
      "People think they need perfect condition to start, in reality starting is perfect condition.",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/post/new", (req, res) => {
  // creates new post
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  // res.send("content posted successfully")
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  //to get/view a post
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  console.log(post);
  // console.log(id);
  res.render("show.ejs", { post });
});


app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  if (post) {
    post.content = newContent;
    console.log(post);
    // res.send("Patch request is working");
    res.redirect("/posts");

  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (post) {
    res.render("edit.ejs", { post: post }); // Passing 'post' object to the template
  } else {
    res.status(404).send("Post not found");
  }
});

app.delete("/posts/:id", (req, res)=>{
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
})

app.get("/post", (req, res) => {
  res.render("new.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

