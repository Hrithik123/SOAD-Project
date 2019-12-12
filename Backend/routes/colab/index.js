const express = require("express");

const artistTypes = require("../../models/artistTypes");
const { getArtistType } = require("./helper");
const { verifyToken, verifyUserWithToken } = require("../auth/helper");

// const {
//     InterstedInWork,
//     createJobOffer,
//     getJobByID,
//     getAllArtistsOfType,
//     getAllArtistsOfTypeAndArea,
//     getJobOffersWithOptions,
//     getAllJobOffersOfType,
//     getAllJobOffersOfTypeAndArea,
//     applyForJob
// } = require("./colabControls");
const colabControls = require("./colabControls");

// instance of router
const router = express.Router();

// ----------------- routes start here ------------------------
// route to get all types of artists
router.get("/allTypes", (req, res) => {
    return res.json(artistTypes);
});

// route to apply for a interested in working by a valid user
router.post(
    "/interestedInWork",
    verifyToken,
    verifyUserWithToken,
    colabControls.InterstedInWork
);

// route to post a job offer request
router.post(
    "/jobOffer",
    verifyToken,
    verifyUserWithToken,
    colabControls.createJobOffer
);

// route to get the job offer with the id given
router.get("/jobOffer/:id", colabControls.getJobByID);

// route to get all the avaliable artists for work
router.get(
    "/artistForWork/:type",
    getArtistType,
    colabControls.getAllArtistsOfType
);

// route to get all the avaliable artists for work
router.get(
    "/artistForWork/:type/:area",
    getArtistType,
    colabControls.getAllArtistsOfTypeAndArea
);

// route to get jobOffers with options
router.post("/jobOffers", colabControls.getJobOffersWithOptions);

// route to get all job offers for all different artist
router.get(
    "/jobOffers/:type",
    getArtistType,
    colabControls.getAllJobOffersOfType
);

// route to get all job offers for all different artist
router.get(
    "/JobOffers/:type/:area",
    getArtistType,
    colabControls.getAllJobOffersOfTypeAndArea
);

// route for appling for a job offer
router.post(
    "/applyJob",
    verifyToken,
    verifyUserWithToken,
    colabControls.applyForJob
);

module.exports = router;
