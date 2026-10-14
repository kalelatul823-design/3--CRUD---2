let cl = console.log;

let blogs = [
  {
    "content": "Rxjs and NgRx State Management.",
    "id": "101",
    "title": "TEST 123",
    "author": "jhon doe",
    "createdAt": 1234,
    "updatedAt": null
  },
  {
    "content": "Learn JavaScript and Node.js.",
    "id": "102",
    "title": "Node.js Basics",
    "author": "May doe",
    "createdAt": 1234454,
    "updatedAt": null
  }
]

const PORT = 3000; //localhost :: 3000

const express = require("express");
const app = express();
app.use(express.json());

//GET ALL  :: BASE_URL/API/BLOGS & GET
app.get("/api/blogs", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error while fetching blogs`,
      error: err.message,
    });
  }
});

//single data get karna
app.get("/api/blogs/:id", (req, res) => {
  try {
    let blogId = req.params.id;

    let blog = blogs.find((b) => b.id === blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog with id ${blogId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
      message: `Blog with id ${blogId} fetched successfully`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while fetching blog",
      error: err.message,
    });
  }
});

//CREATE Blog :: BASE_URL/api/blogs & POST & BODY {title, content, and Auther : anonymous}
app.post("/api/blogs", (req, res) => {
  try{
    let body = req.body;
  if(!body.title || !body.content){
    return res.status(400).json({
        success : false,
        message : `Title and content are require fields !!!`
    })
  }

  //save in database
  let newBlog = {
    title: body.title,
    content :body.content,
    author : body.author || "Anonymous",
    id : Date.now().toString(),
    createdAt : Date.now(),
    updatedAt : null
  };
  blogs.unshift(newBlog);
  res.status(201).json({
    success : true,
    data : newBlog,
    message : `The new blog with id ${newBlog.id} created successfully`
  })
  }catch(err){
    res.status(500).json({
      success: false,
      message: "Error while fetching blog",
      error: err.message
    });
  }
});


//delete
app.delete("/api/blogs/:id", (req, res)=>{
  try{
     let removeId = req.params.id;
     let getIndex = blogs.findIndex(d => d.id === removeId);
     if(getIndex === -1){
      return res.status(404).json({
        success : false,
        message : `The blogs with id ${removeId} is not found`
      })
     }

     let deleteBlog = blogs.splice(getIndex, 1);
     res.status(200).json({
      success : true,
      message : `The blogs with id ${removeId} is removed successfully`,
      data : deleteBlog[0]
     })
  }catch(err){
     res.status(500).json({
      success : false,
      message : `Something went wrong`,
      error : err.message
     })
  }
} )

//update
app.patch("/api/blogs/:id", (req, res)=>{
   try{
      let updateId = req.params.id;
      let body = req.body;
      let blogIndex = blogs.findIndex(b => b.id === updateId);
      if(blogIndex === -1){
        return res.status(404).json({
          success : false,
          message : `Blog with id ${updateId} not found`
        })
      }
     if(!body.title || !body.content){
      return res.status(400).json({
        success : false,
        message : "title and content are not found",
      })
     }
     let updateBlog = {
      ...blogs[blogIndex],
      title : body.title,
      content : body.content,
      author : body.author || "Anonymous",
      updateAt : Date.now()
     }
     res.status(200).json({
        success : true,
        data : updateBlog,
        message : `Blog with id ${updateId} updated successfully`
     })
   }
   catch(err){
      res.status(500).json({
        success : false,
        message : `Something went wrong`,
        error : err.message
      })
   }
})


app.listen(PORT, () => {
  cl(`Server is running on Port ${PORT}`);
});
