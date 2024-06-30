import React from 'react';
import './Pagination.css';

const Pagination = ({ todosPerPage, totalTodos, paginate, currentPage }) => {
  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
