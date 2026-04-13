const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//     .then(()=>{
//         console.log("connected to DB")
//     })
//     .catch((err)=>{
//     console.log(err);
// })

function getCategory(listing) {
    const title = listing.title.toLowerCase();
    const desc = listing.description.toLowerCase();
    const location = listing.location.toLowerCase();

    if (title.includes("mountain") || location.includes("aspen") || location.includes("banff")) {
        return "Mountains";
    }

    if (title.includes("pool") || desc.includes("pool")) {
        return "Amazing Pools";
    }

    if (title.includes("camp") || desc.includes("camp")) {
        return "Camping";
    }

    if (title.includes("farm")) {
        return "Farms";
    }

    if (title.includes("castle")) {
        return "Castles";
    }

    if (location.includes("new york") || location.includes("tokyo") || location.includes("paris") || location.includes("miami")) {
        return "Iconic Cities";
    }

    if (title.includes("room") || title.includes("apartment") || title.includes("loft")) {
        return "Rooms";
    }

    if (location.includes("alaska") || location.includes("arctic")) {
        return "Arctic";
    }

    return "Trending"; // default
}
async function main(){
    await mongoose.connect(MONGO_URL);
    console.log("connected to DB");
    let listings = await Listing.find({});
    for (let listing of listings) {
        let category = getCategory(listing);
        await Listing.findByIdAndUpdate(listing._id, { category });
    }
    console.log("Categories Updated ✅");
    mongoose.connection.close();
}
main();
// const initDB = async ()=>{
//     await Listing.deleteMany({});   //phle jo bhi data pda hai  delete kr do
//     initData.data= initData.data.map((obj)=>({...obj,owner: "69d55c545dacacbbf26e44a6"})); //to add owner
//     await Listing.insertMany(initData.data);    //yeh apne aap me object hai and hume key data ko access krna hai 
// }

// initDB();