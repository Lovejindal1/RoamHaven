const express = require('express');
const router  = express.Router({mergeParams:true});   
const wrapAsync = require("../utlis/wrapAsync.js");

const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware");

const reviewController = require("../controllers/reviews.js");
 
// Reviews POST route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete Review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));
 
module.exports = router;