if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utlis/ExpressError.js");
const session = require("express-session")
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter =require("./routes/listing.js");
const reviewRouter  =require("./routes/review.js");
const userRouter    =require("./routes/user.js");


mongoose.connect(process.env.ATLASDB_URL)
  .then(() => {
    console.log("✅ DB Connected");
  })
  .catch(err => {
    console.log("DB Error:", err);
  });


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));   
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));  


const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 60 * 60,
})
store.on("error", function(e){
    console.log("SESSION STORE ERROR",e);
})
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}



app.get('/',(req,res)=>{
    console.log("Hi, I am root");
    res.redirect("/listings");
})



app.use(session(sessionOptions));
// Use passport  
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.search = req.query.search || "";
    res.locals.category = req.query.category || "";
    next();
})


app.get("/demouser",async (req,res)=>{
    let fakeuser = new User({
        email: "saamya@gmail.com",
        username: "saamya13"
    })
    let newUser =await User.register(fakeuser,"Saamya@123");
    res.send(newUser);
})

app.use("/listings/:id/reviews",reviewRouter);
app.use("/listings", listingRouter)
app.use("/" ,userRouter);



app.use((err, req, res, next) => {
    console.log("STATUS:", err.statusCode);
    console.log("MESSAGE:", err.message);
    console.log("STACK:", err.stack);  
    
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
})


// all random route for handling error
app.all('/{*any}', (req, res, next) => {
    next();
});

// PORT: 8080
app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
})