# libremdb

A free & open source IMDb front-end.

Inspired by projects like [teddit](https://codeberg.org/teddit/teddit), [nitter](https://github.com/zedeus/nitter) and [many others](#similar-projects).

|                                                                                                          |                                                                                                        |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| <img src="./public/img/misc/preview.jpg" title="screenshot (desktop screen, light mode)" width="1500" /> | <img src="./public/img/misc/preview2.jpg" title="screenshot (mobile screen, dark mode)" width="400" /> |

---

## Some Features

- No ads or tracking  
  Browse any movie info without being tracked or bombarded by annoying ads.
- Modern interface  
  Modern interface with curated colors supporting both dark and light themes.
- Responsive design  
  Be it your small mobile or big computer screen, it's fully responsive.
- Lightweight  
  _[Up movie page](https://imdb.com/title/tt1049413/)_  
  (tested on Firefox v104; without scroll; simulated regular 4g)

  | Network tab stats        | libremdb | IMDb   |
  | ------------------------ | -------- | ------ |
  | no. of requests          | 22       | 180    |
  | data transfered(gzipped) | 468KB    | 1.88MB |
  | load event fired in      | 6.22s    | 10.01s |

---

## Instances

| Instance                                 | Tor                                                                                    | I2P                                                                         | Region  | Cloudflare | Notes                                                              |
| ---------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------- | ---------- | ------------------------------------------------------------------ |
| <https://libremdb.iket.me/>              | No                                                                                     | No                                                                          | CA      | No         | Operated by me                                                     |
| <https://libremdb.pussthecat.org/>       | No                                                                                     | No                                                                          | DE      | No         | Operated by [PussTheCat.org](https://pussthecat.org/)              |
| <https://ld.vern.cc/>                    | [Yes](http://ld.vernccvbvyi5qhfzyqengccj7lkove6bjot2xhh5kajhwvidqafczrad.onion/)       | [Yes](http://vernz3ubrntql4wrgyrssd6u3qzi36zrhz2agbo6vibzbs5olk2q.b32.i2p/) | US      | No         | Operated by [~vern](https://vern.cc/)                              |
| <https://binge.whatever.social/>         | No                                                                                     | No                                                                          | US/DE   | No         | Operated by [Whatever Social](https://whatever.social/)            |
| <https://libremdb.lunar.icu/>            | No                                                                                     | No                                                                          | DE      | No         | Operated by [lunar.icu](https://lunar.icu/)                        |
| <https://libremdb.jeikobu.net/>          | No                                                                                     | No                                                                          | DE      | Yes        | Operated by [shindouj](https://github.com/shindouj/)               |
| <https://lmdb.hostux.net/>               | No                                                                                     | No                                                                          | FR      | No         | Operated by [Hostux.net](https://hostux.net/)                      |
| <https://binge.whateveritworks.org/>     | No                                                                                     | No                                                                          | DE      | Yes        | Operated by [WhateverItWorks](https://github.com/WhateverItWorks/) |
| <https://libremdb.nerdyfam.tech/>        | No                                                                                     | No                                                                          | US      | Yes        | Operated by [Nerdyfam.tech](https://nerdyfam.tech/)                |
| <https://libremdb.tux.pizza/>            | No                                                                                     | No                                                                          | US      | No         | Operated by [tux.pizza](https://tux.pizza/)                        |
| <https://libremdb.frontendfriendly.xyz/> | No                                                                                     | No                                                                          | &mdash; | No         | Operated by [frontendfriendly.xyz](https://frontendfriendly.xyz/)  |
| <https://d.opnxng.com/>                  | No                                                                                     | No                                                                          | SG      | No         | Operated by [Opnxng](https://about.opnxng.com/)                    |
| <https://libremdb.catsarch.com/>         | [Yes](https://libremdb.catsarchywsyuss6jdxlypsw5dc7owd5u5tr6bujxb7o6xw2hipqehyd.onion) | [Yes](http://qjlgasoy3nxepgzntucmcnb6pryqxakwdu7sxvqzi7spdfootryq.b32.i2p/) | US/DE   | No         | Operated by [Butter Cat](https://catsarch.com/)                    |
| <https://libremdb.r4fo.com/>             | [Yes](http://libremdb.r4focoma7gu2zdwwcjjad47ysxt634lg73sxmdbkdozanwqslho5ohyd.onion/) | No                                                                          | NL      | No         | Operated by [r4fo](https://r4fo.com/)                              |
| <https://libremdb.privacydev.net/>       | [Yes](http://libremdb.g4c3eya4clenolymqbpgwz3q3tawoxw56yhzk4vugqrl6dtu3ejvhjid.onion/) | No                                                                          | FR      | No         | Operated by [PrivacyDev](https://privacydev.net/)                  |
| <https://libremdb.ducks.party/>          | No                                                                                     | No                                                                          | NL      | No         | Operated by [ducks.party](https://ducks.party/)                    |
| <https://lmdb.ngn.tf/>                   | No                                                                                     | No                                                                          | TR      | No         | Operated by [ngn](https://ngn.tf/)                                 |
| <https://lmdb.bloat.cat/>                | No                                                                                     | No                                                                          | DE      | No         | Operated by [bloat.cat](https://bloat.cat/)                        |
| <https://libremdb.darkness.services/>    | No                                                                                     | No                                                                          | US      | Yes        | Operated by [blade10101](https://github.com/blade10101)            |
| <https://libremdb.hyperreal.coffee/>     | No                                                                                     | No                                                                          | US      | No         | Operated by [hyperreal64](https://github.com/hyperreal64)          |
| <https://ld.ca.zorby.top/>               | [Yes](http://q3hetdcyyy572xznqmsledzlbv77moycoqs6ptehpp5vsmx4dtcuqeqd.onion/)          | [Yes](http://5j37qusybvyhecljn4hr5i4chifdlfqfkfveythzpzyfxiibt7cq.b32.i2p/) | CA      | No         | Operated by [Troughy](https://zorby.top/)                          |
| <https://imdb.nerdvpn.de/>               | No                                                                                     | No                                                                          | UA      | No         | Operated by [Weidenwiesel](https://nerdvpn.de/)                    |
| <https://libremdb.canine.tools/>         | No                                                                                     | No                                                                          | US      | No         | Operated by [canine.tools](https://canine.tools/)                  |
| <https://libremdb-fly.fly.dev/>          | No                                                                                     | No                                                                          | US      | No         | Operated by [jodanjodan](https://github.com/JodanJodan)                  |
| <https://libremdb.franklyflawless.org/>  | No                                                                                     | No                                                                          | DE      | No         | Operated by [FranklyFlawless](https://franklyflawless.org)               |

Instances list in JSON format can be found in [instances.json](instances.json) file.

---

## Questions you might have

- How do I use it?  
  Replace `imdb.com` in any IMDb URL with any of the instances. For example: '[imdb.com/title/tt1049413](https://imdb.com/title/tt1049413/)' to '[libremdb.iket.me/title/tt1049413](https://libremdb.iket.me/title/tt1049413/)'.  
  To avoid changing the URLs manually, you can use [extensions](#automatic-redirection).

- Why is it so slow?  
  Whenever you request info about a movie/show on libremdb, 4 trips are made(2 between your browser and libremdb's server, and 2 between libremdb's server and IMDb's server) instead of the usual 2 trips when you visit a website. For this reason there's a noticable delay. This is a bit of inconvenience you'll have to face should you wish to use this website.

- It doesn't have all routes.  
  I'll implement more with time :)

- Is content served from third-parties, like Amazon?  
  Nope, libremdb proxies all image and video requests through the instance to avoid exposing your IP address, browser information and other personally identifiable metadata ([Contributor](https://github.com/httpjamesm)).

- Why not just use IMDb?  
  Refer to the [features section](#some-features) above.

- Why didn't you use other databases like [TMDB](https://www.themoviedb.org/) or [OMDb](https://www.omdbapi.com/)?  
  IMDb simply has superior dataset compared to all other alternatives. With that being said, I'd encourage you to check out those alternatives too.

---

## Privacy

- Information collected:  
  None.

- Information stored in your browser:  
  A key named 'theme' is stored in Local Storage provided by your browser, if you ever override the default theme. To remove it, go to site data settings, and clear the data for this website. To permamently disable libremdb from storing your theme prefrences, either turn off JavaScript or disable access to Local Storage for libremdb.

- Information collected by other services:  
  None. libremdb proxies images anonymously through the instance for maximum privacy ([Contributor](https://github.com/httpjamesm)).

---

## To-Do

- [ ] add advanced search route
- [x] add did you know and reviews on movie info page
- [x] add a way to see trailer and other videos
- [ ] implement movie specific routes like:

  - [ ] reviews(including critic reviews)
  - [ ] video & image gallery
  - [ ] sections under 'did you know'
  - [ ] release info
  - [ ] parental guide

- [ ] implement other routes like:

  - [ ] lists
  - [ ] moviemeter
  - [x] person info(includes directors and actors)
  - [ ] company info
  - [ ] user info

- [x] use redis, or any other caching strategy
- [x] implement a better installation method
- [x] serve images and videos from libremdb itself

---

## Installation

As libremdb is made with Next.js, you can deploy it anywhere where Next.js is supported. Below are a few other methods:

### Manual

1. Install Node.js and Git.  
   for Node.js, visit [their website](https://nodejs.org/en/).  
   for Git, run `sudo apt install git` if you're on a Debian-based distro. Else visit [their website](https://git-scm.com/).

2. Install redis(optional).  
   You can install redis from [here](https://redis.io).

3. Clone and set up the repo.

   ```bash
   git clone https://github.com/zyachel/libremdb.git # replace github.com with codeberg.org if you wish so.
   cd libremdb
   # change the configuration file to your liking.
   cp .env.local.example .env.local
   # replace 'pnpm' with yarn or npm if you use those.
   pnpm install
   pnpm build
   pnpm start
   # optional: if you're using redis
   redis-server
   ```

libremdb will start running at http://localhost:3000.  
To change port, modify the last command like this: `pnpm start -- -p <port-number>`.

### Docker (Local)

You can build the docker image using the provided Dockerfile(thanks to [@httpjamesm](https://github.com/httpjamesm)) and set it up using the [example docker-compose file](./docker-compose.example.yml).

Change the docker-compose file to your liking and run `docker-compose up -d` to start the container, that's all!

### Docker (Pre-Built)

Use the pre-built images from github packages using `docker pull ghcr.io/zyachel/libremdb:latest` to pull latest images.

To run the container with pulled image use the following command.
> Note: Env file is required for running this image. Download and edit this [env file](https://github.com/zyachel/libremdb/blob/main/.env.local.example).


```sh 
docker/podman run \
 --detach \
 --name "libremdb" \
 -p 3000:3000 \
 --env-file "path_to_env_file" \
 ghcr.io/zyachel/libremdb:latest
```

OR 

There's a [docker image](https://github.com/PussTheCat-org/docker-libremdb-quay) made by [@TheFrenchGhosty](https://github.com/TheFrenchGhosty) for [PussTheCat.org's instance](https://libremdb.pussthecat.org). You can use that as well.

## Miscellaneous

### Automatic redirection

- [Redirector](https://github.com/einaregilsson/Redirector)  
  config:

  ```
  Description: redirect IMDb to libremdb
  Example URL: https://www.imdb.com/title/tt0258463/?ref_=tt_sims_tt_t_4
  Include pattern: https?:\/\/(www\.)?imdb\.com\/(.*)
  Redirect to: https://libremdb.iket.me/$2
  Pattern type: Regular Expression
  ```

- [LibRedirect](https://github.com/libredirect/libredirect/)

- [Privacy Redirector](https://github.com/dybdeskarphet/privacy-redirector)

### Similar projects

- [Teddit](https://codeberg.org/teddit/teddit)  
  Teddit is an alternative Reddit front-end focused on privacy.
- [Nitter](https://github.com/zedeus/nitter)  
  Nitter is a free and open source alternative Twitter front-end focused on privacy.
- [Bibliogram](https://sr.ht/~cadence/bibliogram/)  
  Bibliogram is an alternative front-end for Instagram.
- [Invidious](https://invidious.io)  
  Invidious is an alternative front-end to YouTube.
- [Libreddit](https://github.com/spikecodes/libreddit)  
  Libreddit is an alternative private front-end to Reddit.
- [Scribe](https://git.sr.ht/~edwardloveall/scribe)  
  Scribe is an alternative Medium frontend.
- [full list &rarr;](https://github.com/digitalblossom/alternative-frontends)

---

## Contact

I'm availabe on [[matrix]](https://matrix.to/#/@ninal:matrix.org) and [email](mailto:aricla@protonmail.com) in case you wish to contact me personally.

---

## License

Licensed under GNU AGPLv3.  
See [License](./LICENSE) for full legalese.

---

## Disclaimer

_libremdb does not host any content. All content on libremdb is from IMDb. IMDb is a trademark of IMDb.com, Inc._
