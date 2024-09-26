const express = require("express");
const router = express.Router();
const authController=require('../collection/authController');
const { getallproducts, reviewadd , reviewupdate, reviewdelete , searchisbn} = require("../collection/listing");

const { requireAuth }=require(`../middleware/authveify`);

router.route("/").get(getallproducts);

router.post("/reviewadd",requireAuth,reviewadd);
// router.get("/review",requireAuth,review);
router.put('/reviewupdate',requireAuth,reviewupdate);
router.delete("/reviewdelete",requireAuth,reviewdelete);
// router.post('/testing', authverify, getallproductstesting );
router.post('/signup', authController.signup_post);
// router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/search', searchisbn);

module.exports = router;