const apiToDB = require("./apiDB");
const getDBinfo = require("./getDBinfo");

const getAllCountries = async (req, res) => {
  try {
    await apiToDB(); //esta linea agarra la data en la api de paises y la setea en la BD
    const data = await getDBinfo();

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const getCountryByName = async (req, res) => {
  const { name } = req.query; //guardo la info que obtengo por query (name)

  try {
    const dbInfo = await getDBinfo(); //obtengo la info que tengo ahora en mi DB

    if (!name) {
      return res.status(200).json(dbInfo);
      //si no me pasan "name" por query, devuelvo todos los namees.
    } else {
      const filteredname = dbInfo.filter((element) =>
        element.name.toLowerCase().includes(name.toLowerCase())
      );
      //si si obtengo a "name" por query, hago un filter de lo que tengo en mi BD y comparo, si alguno de los nombres(propiedad name) de todos los objetos(namees) en minusculas (convertida toda la palabra en minuscula), incluye a lo que me llega en "name" tambien convertido en minuscula. ¿Por que?, para de esta forma buscar cualquier tipo de coincidencia, por ejemplo si en mi objeto de mi name Argentina, su name es Argentina con minuscula, si me viene por query 'argent' va a devolver igual mi objeto con name "Argentina".

      // if(!filteredname.length) return res.status(400).json({message: 'name not found'}); // lo saque para poder hacer el "name not found" en el front, necesitaba un array vacio.
      return res.status(200).json(filteredname);
      //si el array que me devuelve el filter esta vacio, devuelvo un estadi 400 y un mensaje adecuando. Sino, un estado 200 OK, y mi array con mi objeto de namees que tuvieron una coincidencia en su propiedad name.
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const getCountryById = async (req, res) => {
  console.log("Ejecutando la fn getcountrybyid");
  const { idPais } = req.params; //guardo la info que obtengo por params (idPais)
  const allCountry = await getDBinfo(); //obtengo la info que tengo ahora en mi DB

  try {
    if (idPais) {
      const idFound = await allCountry.find((country) => country.id === idPais);
      //si recibo por params un ID, me fijo con un find si encuentro coincidencia con algun ID de todos los paises que tengo en mi DB

      if (!idFound) return res.status(400).send("ID of country not found");
      // si no obtuve ninguna coincidencia mando un status 400 y un mensaje

      return res.status(200).json(idFound); // si si encuentra coincidencia, un 200 OK y el objeto que encontre.
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
  getCountryByName,
};
