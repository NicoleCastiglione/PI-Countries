import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getCountries,
  createActivity,
  getActivities,
  deleteActivities,
} from "../../redux/actions";
import validate from "./validate";
import style from "./Activities.module.css";

export const Activities = () => {
  const dispatch = useDispatch();
  const countriesName = useSelector((state) => state.countries);
  const countriesorden = countriesName.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  //selecciona el estado countries declarado en el initialState y lo ordeno alfabeticamente
  const theActivities = useSelector((state) => state.activities);
  const activitiesorden = theActivities.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  //selecciona el estado activities declarado en el initialState y lo ordeno alfabeticamente

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryId: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };
  //se ejecuta cuando se produce un cambio en el input o select, indica que se guarde dentro del estado input, en la propiedad con el mismo nombre que tiene event.target.name ( por ej: 'name'), el valor proporcionado en el input o select y llama a la función setErrors para realizar validaciones en el nuevo estado input.

  const handleSelectCountries = (event) => {
    setInput({
      ...input,
      countryId: [...input.countryId, event.target.value],
    });
    setErrors(
      validate({
        ...input,
        countryId: [...input.countryId, event.target.value],
      })
    );
  };

  //se ejecuta cuando se selecciona el pais o los paises donde se realiza la nueva actividad. Concatena el valor proporcionado en el select con los valores previos en la propiedad countryId, llama a la función setErrors para realizar validaciones en el nuevo estado input.

  const handleSubmit = (event) => {
    console.log("handleSubmit");
    event.preventDefault(); //se evita que la página se recargue al enviar el formulario.
    const errorSave = validate(input); // se asigna el resultado de la funcion validate, pasandole input como parametro.
    const existName = theActivities.find(
      (activity) => activity.name.toLowerCase() === input.name.toLowerCase()
    )
      ? 1
      : 0; //si hay alguna actividad con el mismo nombre que el valor ingresado en el campo input.name, existName se establece en 1, de lo contrario, se establece en 0.
    if (existName === 1) alert("Activity name already exists");
    // si hay una actividad con el mismo nombre
    else if (Object.values(errorSave).length !== 0)
      alert("You must fullfill all the required conditions");
    //Si el objeto errorSave tiene algún valor (Object.values() convierte el objeto en un array), se muestra una alerta al usuario indicando que deben cumplirse todas las condiciones requeridas. ¡¡¡YA NO ES NECESARIO PORQUE DESHABILITE EL BOTON!!!!
    else {
      dispatch(createActivity(input)); //se despacha la action pasandole como argumento "input", que es un objeto con todo lo necesario para crear una nueva actividad.
      alert("Activity Created!");
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countryId: [],
      }); // borrar los datos ingresados en el formulario.
      dispatch(getActivities());
    }
  };

  //------------------------Delete Activity------------------------
  const [delAct, setDelAct] = useState("");

  const handleSelectDelete = (event) => {
    console.log("handleSelectDelete");
    setDelAct(event.target.value);
  };
  //se ejecuta cuando se selecciona una actividad para eliminar en el campo de selección correspondiente. Actualiza el estado delAct con el nombre de la actividad seleccionada.

  const handleSubmitDelete = (event) => {
    console.log("handleSubmitDelete");
    event.preventDefault();
    dispatch(deleteActivities(delAct));
    alert("Activity Deleted!");
    setDelAct("");
    dispatch(getActivities());
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
    dispatch(deleteActivities());
  }, [dispatch]);

  return (
    <div className={style.contenedor}>
      {/* -----------------------Create activity sector----------------------- */}
      <div className={style.formContainer}>
        <p className={style.titulo}>Create your Activity</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={style.formField}>
            <div className={style.unidos}>
              <label className={style.label}>Name: </label>
              <input
                className={style.formInputt}
                onChange={handleChange}
                type="text"
                value={input.name}
                name="name"
                placeholder="Activity name"
              />
            </div>

            {errors.name && <p className={style.formError}>{errors.name}</p>}
          </div>

          <div className={style.formField}>
            <label className={style.label}>Difficulty: </label>
            <select
              className={style.formInput}
              onChange={handleChange}
              name="difficulty"
              defaultValue=""
              value={input.difficulty}
            >
              <option value="" disabled hidden>
                Select difficulty
              </option>
              {[...Array(5)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>

            {errors.difficulty && (
              <p className={style.formError}>{errors.difficulty}</p>
            )}
          </div>

          <div className={style.formField}>
            <label className={style.label}>Duration: </label>
            <select
              className={style.formInput}
              onChange={handleChange}
              name="duration"
              defaultValue=""
              value={input.duration}
            >
              <option value="" disabled hidden>
                Select duration
              </option>
              {[...Array(24)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1} hs
                </option>
              ))}
            </select>

            {errors.duration && (
              <p className={style.formError}>{errors.duration}</p>
            )}
          </div>

          <div className={style.formField}>
            <label className={style.label}>Season: </label>
            <select
              className={style.formInput}
              onChange={handleChange}
              name="season"
              defaultValue=""
              value={input.season}
            >
              <option value="" disabled hidden>
                Select season
              </option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
            </select>

            {errors.season && (
              <p className={style.formError}>{errors.season}</p>
            )}
          </div>

          <div className={style.formField}>
            <label className={style.label}>Country: </label>
            <select
              className={style.formInput}
              onChange={handleSelectCountries}
              defaultValue=""
              value={input.countryId}
            >
              <option value="" disabled hidden>
                Select country
              </option>
              {countriesorden.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
                // se generan opciones para el menú desplegable. Cada objeto country genera una opción con su id como valor y su name como texto visible para el usuario.
              ))}
            </select>

            {errors.countryId && (
              <p className={style.formError}>{errors.countryId}</p>
            )}

            <div>
              <ul className={style.elegidos}>
                <p>
                  {input.countryId.map((countrieId_input) =>
                    countriesName.map((countrie_state) => {
                      if (countrie_state.id === countrieId_input) {
                        return countrie_state.name + ", ";
                      }
                    })
                  )}
                </p>
              </ul>
            </div>

            {/* Se mapea la propiedad countryId del objeto input, donde se guardaron los id de los paises seleccionados anteriormente. Luego se vuelve a hacer otro mapeo, esta vez de la constante countriesName, que contiene el valor del estado countries que es un array con todos los paises. En este segundo mapeo se compara si el Id de alguno de los paises dentro del estado countries coincide con el id de los paises seleccionados, que se renderice en una etiqueta <p> el nombre de ese pais + , */}
          </div>

          <div>
            <button
              className={style.reload}
              type="submit"
              disabled={
                input.name === "" ||
                input.difficulty === "" ||
                input.duration === "" ||
                input.season === "" ||
                input.countryId.length < 0 ||
                errors.name ||
                errors.difficulty ||
                errors.duration ||
                errors.season ||
                errors.countryId
              }
            >
              Create
            </button>
          </div>
        </form>
      </div>

      {/* -----------------------Delete activity sector----------------------- */}
      <div className={style.formContainerdel}>
        <div>
          <p className={style.titulo}>Delete Activity</p>
          <form onSubmit={handleSubmitDelete}>
            <div className={style.formField}>
              <div>
                <select
                  className={style.formInputdel}
                  onChange={handleSelectDelete}
                  value={delAct}
                >
                  <option value="" disabled hidden>
                    Select activity
                  </option>
                  {activitiesorden &&
                    activitiesorden.map((activity) => (
                      <option key={activity.name} value={activity.name}>
                        {activity.name}
                      </option>
                    ))}
                  {/* si la constante theActivities que tiene asignado el valor del estado activities, que es listado de actividades, existe osea si hay actividades dentro del estado, se hace un mapeo de esta constante en el que por cada actividad de renderiza una opcion con el valor del nombre de la actividad y que renderice tambien su nombre. De esta forma le asignamos el valor del nombre de la actividad al estado delAct, que luego se le pasa como argumento a la action deleteActivities, y de esta forma se elimina dicha actividad. */}
                </select>
              </div>
            </div>

            <p className={style.elegidos}>
              {delAct
                ? `Activity to delete: ${delAct}`
                : "Select activity to delete"}
            </p>

            <div>
              <button className={style.reload} type="submit" disabled={!delAct}>
                Delete Activity
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
