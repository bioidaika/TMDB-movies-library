import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/movie/slice';
import { selectCurrentPage, selectTotalPages } from '../../redux/movie/selectors';

const Pagination = () => {
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const handlePageClick = (event: { selected: number }) => {
    console.log('event.selected', event.selected + 1);
    dispatch(setPage(event.selected + 1));
  };

  return (
    <div>
      <ReactPaginate
        className={css.pagination}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        marginPagesDisplayed={3}
        pageClassName={css.paginationItem}
        pageLinkClassName={css.paginationLink}
        activeLinkClassName={css.activePage}
        pageRangeDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;
