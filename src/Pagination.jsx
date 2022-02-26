import React from "react";

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

function Pagination({ limit, total, offset, setOffset }) {
  /*limit => quantos itens ta aparecendo por pagina */
  //total => total de paginas para ser mostrata
  //offset => "pular alguns itens"

  const currentPage = offset ? offset / limit + 1 : 1;
  //temos que verificar se o offset não é um valor 0
  const pages = Math.ceil(total / limit);
  const firstButton = Math.max(currentPage - MAX_LEFT, 1);

  const onChangePage = (page) => {
    setOffset((page - 1) * limit);
  };

  return (
    <ul className="pagination">
      <li>
        <button
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
      </li>
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + firstButton)
        .map((page) => (
          <li key={page}>
            <button
              onClick={() => onChangePage(page)}
              className={
                page === currentPage ? "pagination__item--active" : null
              }
            >
              {page}
            </button>
          </li>
        ))}
      <li>
        <button
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === pages}
        >
          Próximo
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
