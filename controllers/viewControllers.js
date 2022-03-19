const { AppError, catchErrors } = require('../utils/errorUtils');
// const { genres, popularGenres } = require('../utils/constants');
const getMovie = require('../fetchers/movie');

exports.overview = (req, res, next) => res.redirect(301, '/about');

exports.about = catchErrors(async (req, res, next) => {
  res.render('about', { title: 'About', page: 'About' });
});

exports.privacy = catchErrors(async (req, res, next) => {
  res.render('privacy', { title: 'Privacy', page: 'Privacy' });
});

exports.contact = catchErrors(async (req, res, next) => {
  res.render('contact', { title: 'Contact', page: 'Contact' });
});

exports.similarProjects = catchErrors(async (req, res, next) => {
  res.render('similarProjects', {
    title: 'Similar Projects',
    page: 'Similar Projects',
  });
});

exports.movie = catchErrors(async (req, res, next) => {
  const movie = await getMovie(req.params.title, +process.env.IMAGE_QUALITY);
  res.render('movie', {
    movie,
    title: movie.basic.name,
    page: movie.basic.name,
  });
});

/*
exports.searchGenres = catchErrors(async (req, res, next) => {
  // fetching top 10 rated movies to show in homepage
  let movies;
  const genresQueriedStr = req.query.genres;
  const genresQueriedArr = genresQueriedStr?.split(',');

  if (!genresQueriedArr) {
    movies = await moviesDataFetcher('sci-fi,action');
    return res.render('homepage', {
      title: 'Home Page',
      page: 'Home Page',
      movies: movies.slice(-10),
      genres,
      popularGenres,
    });
  }

  const numResults = +req.query.results || 10;
  const numPage = +req.query.page || 1;
  const resultsToskip = numResults * (numPage - 1);

  movies = await moviesDataFetcher(genresQueriedStr);
  movies = movies.slice(resultsToskip, resultsToskip + numResults);
  const totalNumResults = movies.length;

  if (!movies.length) return next(new AppError('no movies found', 404));

  const [curPage, totalPages] = [numPage, totalNumResults / numResults];
  res.render('movies', {
    title: genresQueriedArr.join(', '),
    page: 'Movies',
    genres: genresQueriedArr,
    movies,
    curPage,
    totalPages,
  });
});
*/
