import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/movie/slice';
import { selectCurrentPage, selectTotalPages } from '../../redux/movie/selectors';
import { useSearchParams } from 'react-router-dom';

const Pagination = () => {
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);
  const [, setParams] = useSearchParams();
  const dispatch = useDispatch();

  const handlePageClick = (event: { selected: number }) => {
    // console.log('event.selected', event.selected + 1);
    dispatch(setPage(event.selected + 1));
    const pageNumber = event.selected + 1;
    setParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('page', pageNumber.toString());
      return newParams;
    });
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
        pageLinkClassName={css.pageLink}
        activeLinkClassName={css.activePage}
        pageRangeDisplayed={2}
        pageCount={Math.max(totalPages, 1)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
        nextLinkClassName={css.nextLink}
        previousLinkClassName={css.prevLink}
      />
    </div>
  );
};

export default Pagination;
