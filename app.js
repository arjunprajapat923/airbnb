const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/listing");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");


const uri = "mongodb://localhost:27017/wanderLust"; 


main()
.then(() => {
        console.log("Hey we are connectred to the server")
}).catch((err) => {
    console.log(err)
})


async function main() {
    await mongoose.connect(uri)    
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method")); 
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, "/public")));

app.listen(8050, () => {
    console.log("Hey I am listening to the server ")
})

app.get("/", (req, res) => {
    res.send("Hey you are welcom to the page of air bnb")
});

app.get("/listings", async (req, res) => {
   const allListings = await Listing.find({});
   res.render("listings/index.ejs", {allListings})
});

// New Route
app.get("/listings/new", async (req, res) => {
     res.render("listings/new.ejs")
})

// Show route

app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
})

//  Create Route
app.post("/listings", async (req , res) => {
    // let {title, description, image, price, country, location} = req.body;
    let newListing = new Listing(req.body.listing);
    // new Listing(listing)
    await newListing.save();
    res.redirect("/listings")
})

//  Edit route 
app.get("/listings/:id/edit",  async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing })
})



//  update route

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing})
    res.redirect(`/listings/${id}`)
})