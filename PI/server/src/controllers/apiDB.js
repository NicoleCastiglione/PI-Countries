const axios = require("axios");
const { Country } = require("../db");

//Obtengo la informacion de la bd
const ApiData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/countries");
    const countries = await response.data.map((country) => {
      return {
        id: country.cca3,
        name: country.name.common,
        imageFlag: country.flags.svg,
        continent: country.continents ? country.continents[0] : "undefined",
        capital: country.capital ? country.capital.join(", ") : "undefined",
        subregion: country.subregion ? country.subregion : "undefined",
        area: country.area ? country.area : "undefined",
        population: country.population ? country.population : 0,
      };
    }); //hago un mapeo de la respuesta de la Api de países, y guardo en una constante un objeto con la info de la Api de paises que quiero obtener. El mapeo me va a devolver un array con esos objetos, donde cada objeto es un pais.
    return countries;
  } catch (error) {
    console.log("Error al obtener los datos de la BD", error);
  }
};

//Traigo la info de la Api de países y la cargo en mi Base de Datos
const apiToDB = async () => {
  try {
    const DataBase = await Country.findAll(); //guardo en una constante todos los paises que existan en la Base de Datos
    if (DataBase.length < 1) {
      const allCountries = await ApiData();
      await Country.bulkCreate(allCountries); // bulkCreate es una herramienta para insertar rápidamente múltiples registros en una base de datos a través de una sola consulta
    } //si no encuentro ningun pais en mi DB, guardo en una constante la respuesta de mi controler ApiData. Ejecuto el metodo bulkCreate, pasadole el array de objetos y cargar en mi DB todos los paises.
  } catch (error) {
    console.log("Error al cargar los datos de la Api en la Data Base", error);
  }
};

module.exports = apiToDB;
