import React from "react";
import style from "./Pagination.module.css";

export const Pagination = ({ currentPage, totalPages, onChangePage }) => {
  //este componente es para modularizar y poner menos contenido dentro de Home
  //Los siguientes handlers sirven para determinar cual es la pagina que sigue a continuacion, y la pagina previa a la que estamos viendo en el momento, con esto los botones sabran que es lo que hay ante y acontinuacion.
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  return (
    <div className={style.text}>
      <button
        className="pagination-button"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="pagination-button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};
