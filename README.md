# libremdb

A FOSS alternative front-end to IMDb.

Inspired by projects like [teddit](https://codeberg.org/teddit/teddit), [nitter](https://github.com/zedeus/nitter) and [many others](#similar-projects).

<br/>
<img src="./public/img/misc/preview.png" title="image showing matrix movie info on libremdb" width="1000" />

---

## Features

- No ads or tracking  
  Browse any movie info without being tracked or bombarded by annoying ads.
- No connection to IMDb  
  All requests go through the backend; client never talks to IMDb except for a bunch of requests to `m.media-amazon.com` for images.
- No JavaScript required  
  Just a few linesof code(~30) to save theme preference, which itself is optional.
- Modern interface  
  Modern interface with curated colors supporting both dark and light themes.
- Responsive design  
  Be it your small mobile or big computer screen, it's fully responsive.
- Lightweight  
  _[Up movie page](https://imdb.com/title/tt1049413/)_  
  | | libremdb | IMDb |
  | --------------- | -------- | ------ |
  | no. of requests | ~35 | ~280 |
  | data consumed | 1.35MB | 7.75MB |

---

## FAQs

- Why is it so slow?  
  Whenever you request info about a movie/show on libremdb, 4 trips are made(2 between your browser and libremdb's server, and 2 between libremdb's server and IMDb's server) instead of the usual 2 trips when you visit a website. For this reason there's a noticable delay. This is a bit of inconvenience you'll have to face should you wish to use this website.

- It doesn't have all routes.  
  I think most of the people just check IMDb to get a quick glimpse of a movie/show. That's why there is just one route for now. However, I will try to implement other important routes if time allows. Keep an eye on [To-Do](#to-do) section.

- Why is it connecting to `m.media-amazon.com`?  
  For now, images are directly served from amazon. If I have enough time in the future, I'll implement a way to serve the images from libremdb instead.

- Will amazon track me then?  
  They may log your IP address. I'd recommend using a VPN for mitigating this risk.

- Why not just use IMDb?  
  Refer to the [features section](#features) above.
- Why didn't you use other databases like [TMDB](https://www.themoviedb.org/) or [OMDb](https://www.omdbapi.com/)?  
  IMDb simply has superior dataset compared to all other alternatives. With that being said, I'd encourage you to check out those alternatives too.
- Why did you deploy it on heroku? Why not just buy your own domain name?  
  It's just a proof-of-concept for now. However, if you'd like to do so, you are very welcome.

---

## Privacy

In short: libremdb doesn't collect any data at all.

- Data you directly provide: None.
- Data you passively provide: Heroku might log some things(like IP address). So, consider hosting your own instance or using a VPN.
- Data stored in your browser: To remember theme preferences, the website stores a key named 'theme' in Local Storage provided by your browser. Apart from that, there is nothing stored in your browser.

---

## To-Do

### soon

- [ ] add advanced search route
- [ ] add did you know and reviews on movie info page
- [ ] implement routes for reviews, quotes, goofs, trivia and crazy credits

### at a later stage

- [ ] use redis
- [ ] implement a better installation method
- [ ] serve images from libremdb itself
- [ ] add a way to see trailer and other videos
- [ ] implement other trivial routes

---

## Installation

1. Install Node.js and Git.  
   for Node.js, visit [their website](https://nodejs.org/en/).  
   for Git, run `sudo apt install git` if you're on a Debain-based distro. Else visit [their website](https://git-scm.com/).

2. Clone and set up the repo.

   ```bash
   git clone https://github.com/zyachel/libremdb.git
   cd libremdb
   cp config.env.template config.env # you can make necessary changes
   # if you use npm, change 'pnpm' to 'npm run' here as well as in package.json
   pnpm install
   pnpm start
   ```

libremdb will start running at http://localhost:3000.

---

## similar projects

- [Teddit](https://codeberg.org/teddit/teddit)  
  Teddit is an alternative Reddit front-end focused on privacy.
- [Nitter](https://github.com/zedeus/nitter)  
  Nitter is a free and open source alternative Twitter front-end focused on privacy.
- [Bibliogram](https://sr.ht/~cadence/bibliogram/)  
  Bibliogram is an alternative front-end for Instagram.
- [Invidious](https://invidious.org)  
  Invidious is an alternative front-end to YouTube.
- [Libreddit](https://github.com/spikecodes/libreddit)  
  Libreddit is an alternative private front-end to Reddit.
- [Scribe](https://git.sr.ht/~edwardloveall/scribe)  
  Scribe is an alternative Medium frontend.

- [other cool projects &rarr;](https://github.com/mendel5/alternative-front-ends)

---

## Contact

|                         \[matrix\]                         |                          email                           |
| :--------------------------------------------------------: | :------------------------------------------------------: |
| <img src="./public/img/contact/matrix.png" width="120" />  | <img src="./public/img/contact/email.png" width="120" /> |
| [@ninal:matrix.org](https://matrix.to/#/@ninal:matrix.org) |  [aricla@protonmail.com](mailto:aricla@protonmail.com)   |

---

## License

Licensed under GNU AGPLv3.  
Refer to [License](/LICENSE) for full legalese.
