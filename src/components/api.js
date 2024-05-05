import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const options = {
    method: 'GET',
    params: { language: 'en-US' },
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTRhZmQxZDVkNTdiZTY3OWE5MzI4MzU3MWMzYTVmMyIsInN1YiI6IjY2MWY0MmM2NTI4YjJlMDE3ZDQwMTI4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sGsosBQkBz_InFEWck73LFH_aRCFp19xkfDWyzON9d4'
    }
};

export const getTrendingMovies = async () => {
    const response = await axios.get("trending/movie/day", options);
    return response.data.results;
};

export const getMovieByID = async (movieID) => {
    const response = await axios.get(`movie/${movieID}`, options);
    // console.log(response.data);
    return response.data;
}

export const getMovieCasts = async (movieID) => {
    const response = await axios.get(`movie/${movieID}/credits`, options);
    // console.log(response.data.cast);
    return response.data.cast;
}

export const getMovieReviews = async (movieID) => {
    const response = await axios.get(`movie/${movieID}/reviews`, options);
    // console.log(response.data.results);
    return response.data.results;
}

export const searchMovieQuery = async (searchQuery) => {
    const response = await axios.get(`search/movie?query=${searchQuery}`, options);
    // console.log(response.data.results);
    return response.data.results;
}