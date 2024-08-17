const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js")

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



const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data)
    console.log("data was initialzed")
};
   



initDB();