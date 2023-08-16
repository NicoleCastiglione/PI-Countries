import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCountries,
  getActivities,
  countryFilter,
  ordeByName,
  clearAllFilters,
} from "../../redux/actions";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { Pagination } from "./components/Pagination/Pagination";
import { Filter } from "./components/Filter/Filter";
import { Order } from "./components/Order/Order";
import { Clear } from "./components/Clear/Clear";
import style from "./Home.module.css";

export const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);

  //------------------------Paginado------------------------
  const [currentPage, setCurrentPage] = useState(1); //este estado sirve para indicar cual es la pagina en la que estamos parados
  const elementsPerPage = 10; // esta es la cantidad de items que vamos a presentar por pagina

  const indexOfLastElement = currentPage * elementsPerPage; // obtenemos el indice del primer elemento y el ultimo de cada pagina.
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  const currentElements = countries?.slice(
    indexOfFirstElement,
    indexOfLastElement
  ); // como countries es un array, utilizamos el metodo slice para quedarnos con los items desde el primero hasta el ultimo que vamos a presentar en la pagina en la que nos encontramos actualmente.

  //------------------------useEffect------------------------
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  //----------------------ESTADOS PARA FILTROS Y ORDEN-------------------------

  const [continentFilter, setContinentFilter] = useState("All");
  const [activityFilter, setActivityFilter] = useState("All");
  const [orderBy, setOrderBy] = useState("");

  //----------------------FILTROS-------------------------

  const handleFilterContinent = (event) => {
    event.preventDefault();
    setContinentFilter(event.target.value);
  };

  const handleFilterActivity = (event) => {
    event.preventDefault();
    setActivityFilter(event.target.value);
  };

  //----------------------ORDEN-------------------------
  const handleFilter = () => {
    setCurrentPage(1);
    let filters = {
      continent: continentFilter,
      activity: activityFilter,
    };
    dispatch(countryFilter(filters));
    setOrderBy(""); // setea el select de ordenamiento, para que cada vez que hago un filtro, vuelva a la option Order by...
  };

  const handleOrderByName = (event) => {
    event.preventDefault();
    const selectedValue = event.target.value;
    setOrderBy(selectedValue); //indico que el estado OrderBy tenga el valor de la option seleccionada
    dispatch(ordeByName(selectedValue));
  };

  //------------------------Paginado------------------------
  const totalPages = Math.ceil(countries?.length / elementsPerPage); //dividimos el total de paises por la cantidad que vamos a colocar en cada pagina para obtener el total de paginas.

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; //handler que maneja la pagina en la cual estamos.

  const handleClearFilters = () => {
    dispatch(clearAllFilters());
  };

  return (
    <>
      <Navbar handlePage={handlePageChange} />

      <div className={style.home}>
        <div className={style.filters}>
          <Order orderCountries={handleOrderByName} orderedBy={orderBy} />
          <Filter
            continentFilter={handleFilterContinent}
            activityFilter={handleFilterActivity}
            activities={allActivities}
            applyAction={handleFilter}
          />
          <Clear clear={handleClearFilters} />
        </div>

        <div className={style.container}>
          {currentElements.length !== 0 ? (
            currentElements.map(({ id, name, imageFlag, continent }) => {
              return (
                <Card
                  key={id}
                  id={id}
                  name={name}
                  imageFlag={imageFlag}
                  continent={continent}
                />
              );
            })
          ) : (
            <p className={style.mensaje}>Country not Found</p>
          )}
          <div className={style.pag}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChangePage={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
