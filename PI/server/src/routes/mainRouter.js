const { Router } = require("express");
const countryRouter = require("./countryRouter");
const activityRouter = require("./activityRouter");

const router = Router();

router.use("/countries", countryRouter); //indico que mis rutas de countries van a ser todas /countries...
router.use("/activities", activityRouter);

module.exports = router;
