const express = require("express");
const { contactRegister, courseRegister } = require("../controllers/pageController");
const dashboardController = require('../controllers/dashboardController')

const router = express.Router();

router.post("/contact", contactRegister);
router.post("/courses", courseRegister);
router.get("/courses", dashboardController.getCoursePage)
router.get("/home", dashboardController.getHomePage)
router.get("/about", dashboardController.getAboutPage)
router.get("/contacts", dashboardController.getContactPage)
router.get("/team", dashboardController.getTeamPage)
module.exports = router;
