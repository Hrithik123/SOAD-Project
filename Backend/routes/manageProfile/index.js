const express = require("express");

const Multer = require("multer");

const { verifyToken, verifyUserWithToken } = require("../auth/helper");
const { addFollower } = require("./manageControls");

// instance of router
const router = express.Router();

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024 // no larger than 50mb, you can change as needed.
    }
});

// ------------------ routes start from here --------------
router.post("/addFollower", verifyToken, verifyUserWithToken, addFollower);

module.exports = router;
