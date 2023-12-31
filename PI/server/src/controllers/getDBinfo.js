const { Country } = require("../db");
const { Activity } = require("../db");

//Obtengo la informacion de mi base de datos
const getDBinfo = async () => {
  try {
    return await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: {
          attributes: [],
        },
      },
    }); //busco todos los paises e incluyo la relacion que tiene cada uno con el modelo Activity, de esta forma cada pais va a tener una propiedad "Activities" con los atributos de las actividades con las que esta relacionado.
  } catch (error) {
    console.log("Error al obtener todos los Paises de la DB", error);
  }
};

module.exports = getDBinfo;
