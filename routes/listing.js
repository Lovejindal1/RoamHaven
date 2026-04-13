

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utlis/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware");

const listingController = require("../controllers/listings.js");

const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})

router
    .route("/")
    .get(wrapAsync(listingController.index)) //Index route
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing)); // Create Route


// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router
    .route("/:id")
    .get(wrapAsync(listingController.showListing)) // Show Route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))   // POST : UPDATED ROUTE
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));    // DELETE


// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;