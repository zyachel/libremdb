const cheerio = require('cheerio');
const axiosInstance = require('../utils/axiosInstance');

// cleans images links and adds custom quality(optional).
const cleanLink = (link, quality = null) => {
  if (!link) return '';
  let cleanedLink = link.match(
    /https:\/\/m\.media-amazon\.com\/images\/M\/[^.]*/gm
  )?.[0];
  if (!cleanedLink) return '';
  cleanedLink += quality ? `.UX${quality}.jpeg` : '.jpeg';
  return cleanedLink;
};

const getMovie = async (title, quality = null) => {
  try {
    const res = await axiosInstance(`/title/${title}`);

    const $ = cheerio.load(res.data);

    // basic info
    const name = $('h1').text();
    const metadata = $('ul[data-testid=hero-title-block__metadata] li')
      .map((i, el) =>
        $(el).children().length ? $(el).children().first().text() : $(el).text()
      )
      .toArray();
    const rating = $('[data-testid=hero-rating-bar__aggregate-rating__score]')
      .children()
      .first()
      .text();
    const numVotes = $('[data-testid=hero-rating-bar__aggregate-rating__score]')
      .siblings()
      .last()
      .text();
    const popularity = $('[data-testid="hero-rating-bar__popularity__score"]')
      .first()
      .text();
    const plotBrief = $('span[data-testid=plot-xl]').contents().first().text();
    let poster = $('[data-testid="hero-media__poster"] img').attr('src');
    poster = cleanLink(poster, quality);
    const reviewScores = [];
    $(
      'ul[data-testid="reviewContent-all-reviews"] li a span.three-Elements'
    ).each((i, el) =>
      reviewScores.push([
        $(el).children().first().text(),
        $(el).children().last().text(),
      ])
    );

    // media
    const images = $('section[data-testid="Photos"] .ipc-photo img')
      .map((i, el) => {
        let image = $(el).attr('src');
        return cleanLink(image, quality);
      })
      .toArray();
    const imagesLinkExternal = $('[data-testid=photos-title]').attr('href');
    const videoThumbnail = $('.ipc-slate__slate-image img').attr('src');
    const videoLinkExternal = $('.hero-media__slate-overlay').attr('href');
    const videosLinkExternal = $('[data-testid=videos-title]').attr('href');

    // cast
    const actors = $(
      'section[data-testid="title-cast"] div[data-testid=title-cast-item]'
    )
      .map((i, el) => {
        const name = $(el)
          .find('a[data-testid="title-cast-item__actor"]')
          .text();
        let avatar = $(el).find('img').attr('src');
        avatar = cleanLink(avatar, quality);
        const characterName = $(el)
          .find('a[data-testid=cast-item-characters-link] span')
          .first()
          .text();

        return { name, avatar, characterName };
      })
      .toArray();
    const directors = $(
      'section[data-testid=title-cast] ul li:nth-of-type(1) li'
    )
      .map((i, el) => $(el).find('a').text())
      .toArray();
    const writers = $('section[data-testid=title-cast] ul li:nth-of-type(2) li')
      .map((i, el) => $(el).find('a').text())
      .toArray();

    // storyline
    const plotExpanded = $(
      'section[data-testid="Storyline"] [data-testid=storyline-plot-summary]'
    )
      .contents()
      .first()
      .text();
    const tagline = $(
      'section[data-testid="Storyline"] [data-testid=storyline-taglines] li'
    )
      .first()
      .text();
    const genres = $(
      'section[data-testid="Storyline"] [data-testid=storyline-genres] li'
    )
      .map((i, el) => $(el).text())
      .toArray();
    const parentalGuidance = $(
      '[data-testid="storyline-certificate"] li'
    ).text();

    // reviews
    const reviewSummary = $(
      'section[data-testid="UserReviews"] span[data-testid="review-summary"]'
    ).text();
    const reviewRating = $(
      'section[data-testid="UserReviews"] div[data-testid="review-featured-header"]'
    )
      .children()
      .last()
      .text();
    const reviewComment = $(
      'section[data-testid="UserReviews"] div[data-testid="review-overflow"]'
    ).text();

    // details
    const releaseDate = $(
      'section[data-testid="Details"] li[data-testid="title-details-releasedate"] li'
    ).text();
    const countries = $(
      'section[data-testid="Details"] li[data-testid="title-details-origin"] li'
    )
      .map((i, el) => $(el).text())
      .toArray();
    const officialSite = $(
      'section[data-testid="Details"] li[data-testid="title-details-officialsites"] li a'
    )
      .first()
      .attr('href');
    const languages = $(
      'section[data-testid="Details"] li[data-testid="title-details-languages"] li'
    )
      .map((i, el) => $(el).text())
      .toArray();
    const alternateTitle = $(
      'section[data-testid="Details"] li[data-testid="title-details-akas"] li'
    )
      .first()
      .text();
    const filmingLocations = $(
      'section[data-testid="Details"] li[data-testid="title-details-filminglocations"] li'
    )
      .map((i, el) => $(el).text())
      .toArray();
    const companies = $(
      'section[data-testid="Details"] li[data-testid="title-details-companies"] li'
    )
      .map((i, el) => $(el).text())
      .toArray();

    // technical specs
    const runtime = $(
      'section[data-testid="TechSpecs"] li[data-testid="title-techspec_runtime"] div'
    ).text();
    const color = $(
      'section[data-testid="TechSpecs"] li[data-testid="title-techspec_color"] div'
    ).text();
    const aspectRatio = $(
      'section[data-testid="TechSpecs"] li[data-testid="title-techspec_aspectratio"] div'
    ).text();
    const sound = $(
      'section[data-testid="TechSpecs"] li[data-testid="title-techspec_soundmix"] li'
    )
      .map((i, el) => $(el).text())
      .toArray();

    // boxoffice
    const budget = $(
      'section[data-testid="BoxOffice"] [data-testid="title-boxoffice-section"] li[data-testid="title-boxoffice-budget"] li'
    ).text();
    const grossDomestic = $(
      'section[data-testid="BoxOffice"] [data-testid="title-boxoffice-section"] li[data-testid="title-boxoffice-grossdomestic"] li'
    ).text();
    const openingWeekendDomestic = $(
      'section[data-testid="BoxOffice"] [data-testid="title-boxoffice-section"] li[data-testid="title-boxoffice-openingweekenddomestic"] li'
    )
      .map((i, el) => $(el).text())
      .toArray();
    const grossWorldwide = $(
      'section[data-testid="BoxOffice"] [data-testid="title-boxoffice-section"] li[data-testid="title-boxoffice-cumulativeworldwidegross"] li'
    ).text();

    // making data object
    const data = {
      basic: {
        name,
        poster,
        metadata,
        rating,
        numVotes,
        popularity,
        genres,
        plotBrief,
        directors,
        writers,
      },
      media: {
        poster,
        images,
        imagesLinkExternal,
        videoThumbnail,
        videoLinkExternal,
        videosLinkExternal,
      },
      topCast: { actors, directors, writers },
      storyline: { plotExpanded, tagline, genres, parentalGuidance },
      details: {
        releaseDate,
        countries,
        officialSite,
        languages,
        alternateTitle,
        filmingLocations,
        companies,
      },
      technicalSpecs: {
        runtime,
        color,
        aspectRatio,
        sound,
      },
      boxoffice: {
        budget,
        openingWeekendDomestic,
        grossDomestic,
        grossWorldwide,
      },
      reviews: {
        reviewScores,
        review: {
          reviewComment,
          reviewSummary,
          reviewRating,
        },
      },
    };

    // returning data
    return data;
  } catch (err) {
    console.log(err.response);
    throw err;
  }
};

module.exports = getMovie;
