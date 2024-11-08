import { useEffect } from 'react';
import { Category } from '../components/Category/Category';
import { useDispatch } from 'react-redux';
import { setMovieParam, setPage } from '../redux/movie/slice';
import { useSearchParams } from 'react-router-dom';
import { getTVShowByParam } from '../redux/movie/operations';
import Pagination from '../components/Pagination/Pagination';
import TvList from '../components/TvList/TvList';

const TvPage = () => {
  const queryParams = ['airing_today', 'on_the_air', 'popular', 'top_rated'];
  const dispatch = useDispatch<any>();
  const [params, setParams] = useSearchParams();
  const pageParam = params.get('page') ?? '1';
  const sectionParam = params.get('section') ?? 'airing_today';

  useEffect(() => {
    dispatch(setMovieParam(sectionParam));
    dispatch(setPage(Number(pageParam)));
  }, [dispatch, sectionParam, pageParam]);

  useEffect(() => {
    dispatch(getTVShowByParam({ range: sectionParam, pageN: Number(pageParam) }));
    // console.log('pageParam:', pageParam);
    // console.log('sectionParam:', sectionParam);
  }, [dispatch, sectionParam, pageParam]);

  return (
    <div>
      <Category queryParams={queryParams}>
        <TvList />
        <Pagination />
      </Category>
    </div>
  );
};

export default TvPage;
