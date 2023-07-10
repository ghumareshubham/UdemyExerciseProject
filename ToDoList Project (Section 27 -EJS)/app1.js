import express from "express";
// Express body-parser is an npm module used to  to handle HTTP POST request.
import bodyParser from "body-parser";
//below three imports usefull for sending html file to browser
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {getDay, getDate} from "./date.js";



const app = express();

const items = ["Buy Food","Cook Food","Eat Food"];
const workItem=[];
//below two const usefull for sending html file to browser
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//below two app.set is useful for rendering the list.ejs file
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//below app.use is used for provide style.css file to our dynamic list1.ejs file
app.use(express.static("public"));

// Express body-parser is an npm module used to  to handle HTTP POST request.
app.use(bodyParser.urlencoded({ extended: true }));





app.get("/", function (req, res) {
console.log(getDate);
const day=getDate();
  res.render("list1", { listTitle: day, newListItems: items ,mainTitle:"Food List"});
 
});




app.post("/", function (req, res) {
  const item = req.body.newItem;
  console.log(req.body.list);
  if(req.body.list === "Work"){
    workItem.push(item)
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }


  //    console.log(item);
  //    res.render("list1", {newListItems : item} );

});

app.get("/work",function(req,res){
  const day=getDate();
  res.render("list1",{listTitle:day, newListItems:workItem,mainTitle:"Work List"});
})

// app.post("/work",function(req,res){
//   let item=res.body.newItem;
//   workItem.push(item);
// res.redirect("/work");
// })


app.listen(3000, function () {
  console.log("Server is running on port 3000....");
});
