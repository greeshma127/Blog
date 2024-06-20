import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;
var blogs=[
    {
        id: 1,
        title: "The Rise of Decentralized Finance",
        desc:
          "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
        author: "Alex Thompson",
        date: "2023-08-01T10:00:00Z",
      },
      {
        id: 2,
        title: "The Impact of Artificial Intelligence on Modern Businesses",
        desc:
          "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
        author: "Mia Williams",
        date: "2023-08-05T14:30:00Z",
      },
      {
        id: 3,
        title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        desc:
          "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
        author: "Samuel Green",
        date: "2023-08-10T09:15:00Z",
      },
];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port,()=>{
    console.log(`Server running at ${port}`);
})

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        blogs:blogs,
    });
})

app.get("/create",(req,res)=>{
    res.render("create.ejs");
})

app.get("/edit",(req,res)=>{
    res.render("edit.ejs");
})

app.get("/delete",(req,res)=>{
    res.render("delete.ejs");
})

app.get("/about",(req,res)=>{
    res.render("about.ejs");
})

app.post("/submit",(req,res)=>{
    var t=req.body["title"];
    var d=req.body["new_post"];
    var a=req.body["auth"];
    blogs.push({
        title:t,
        desc:d,
        author:a,
    });
    res.redirect("/");
});



app.get("/post/:title",(req,res)=>{
    const title=req.params.title;
    const blog=blogs.find(p=>p.title===title);
    if(blog){
        res.render("post.ejs",{blog:blog,});
    }
    else{
        res.status(404).send("Post not found");
    }
})

app.post("/edit/:title", (req, res) => {
    const title = req.params.title;
    const newTitle = req.body.title;
    const newDesc = req.body.content;
    
    // Find the blog post by title
    const blog = blogs.find(p => p.title === title);
    if (blog) {
        // Update the blog post
        blog.title = newTitle;
        blog.desc = newDesc;
        res.redirect("/");
    } else {
        res.status(404).send("Blog post not found");
    }
});

app.get("/edit/:title", (req, res) => {
    const title = req.params.title;
    const blog = blogs.find(p => p.title === title);
    if (blog) {
        res.render("edit.ejs", { blog });
    } else {
        res.status(404).send("Blog post not found");
    }
});

// Assuming your existing setup with `app` and `blogs` array

app.post("/delete/:title", (req, res) => {
    const title = req.params.title;
    
    // Find the index of the blog post in the `blogs` array
    const index = blogs.findIndex(p => p.title === title);
    
    if (index !== -1) {
        // Remove the blog post from the array
        blogs.splice(index, 1);
        res.redirect("/");
    } else {
        res.status(404).send("Blog post not found");
    }
});

app.get("/delete/:title", (req, res) => {
    const title = req.params.title;
    const blog = blogs.find(p => p.title === title);
    if (blog) {
        res.render({ blog });
    } else {
        res.status(404).send("Blog post not found");
    }
});