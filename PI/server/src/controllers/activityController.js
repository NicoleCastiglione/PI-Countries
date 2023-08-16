const { Activity } = require("../db");

//Creo una nueva Actividad y la relaciono con el pais correspondiente

const postActivity = async (req, res) => {
  const { name, difficulty, duration, season, countryId } = req.body;
  try {
    //'actividad' es la actividad encontrada o creada, 'created' es el valor booleano por si se creo(true) o no se creo(false) una nueva actividad
    let [actividad, created] = await Activity.findOrCreate({
      where: {
        name,
        difficulty,
        duration,
        season,
      },
    });
    await actividad.setCountries(countryId); //establezco la relacion con el pais correspondiente
    return res.status(200).json(actividad); //devuelvo el objeto con mi actividad, relacionada con el pais correspondiente.
  } catch (error) {
    console.log("Error al crear la actividad", error);
    return res.status(400).send(error);
  }
};

const getActivities = async (req, res) => {
  try {
    const DataActivities = await Activity.findAll(); //traigo todas las actividades de la DB.
    res.status(200).json(DataActivities);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  postActivity,
  getActivities,
};
