const { Router } = require("express");
const {
  getAllCountries,
  getCountryById,
  getCountryByName,
} = require("../controllers/countryController");
const countryRouter = Router();

countryRouter.get("/", getAllCountries);

countryRouter.get("/name", getCountryByName);

countryRouter.get("/:idPais", getCountryById);

module.exports = countryRouter;
