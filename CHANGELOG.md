## [2.2.1](https://github.com/zyachel/libremdb/compare/v2.2.0...v2.2.1) (2022-12-01)


### Bug Fixes

* **title:** fix site crash ([dd75df0](https://github.com/zyachel/libremdb/commit/dd75df01eb7c03d8945a8bd20ed231a66bd88b8f))



# [2.2.0](https://github.com/zyachel/libremdb/compare/v2.1.0...v2.2.0) (2022-11-13)


### Bug Fixes

* **redis:** fix logs being polluted when redis is disabled ([5fd0d92](https://github.com/zyachel/libremdb/commit/5fd0d9218707797999fe49e256244bb5cb8d2f66))


### Features

* force a certain language when getting data ([1658769](https://github.com/zyachel/libremdb/commit/1658769a30eae5e642c7c2a54aecf88aec4fd274))



# [2.1.0](https://github.com/zyachel/libremdb/compare/v2.0.0...v2.1.0) (2022-11-13)


### Bug Fixes

* bypass response limit for media proxy endpoint ([9bce8a2](https://github.com/zyachel/libremdb/commit/9bce8a2dd50736ee969da783c3b29bfb9fa215f4))
* change to poster for og:image ([261a375](https://github.com/zyachel/libremdb/commit/261a37576b65474ef8867baa622f28a75906f1f2))
* remove "information collected by other services" in privacy ([6ae71d7](https://github.com/zyachel/libremdb/commit/6ae71d7907f3634773d973c7840b4bfb6aa7ea4d))
* remove double space in inspiration credit ([478b459](https://github.com/zyachel/libremdb/commit/478b45977d672e111d0a645f4e429087d869e65e))


### Features

* add "og:image" property for social media embeds ([a2fc232](https://github.com/zyachel/libremdb/commit/a2fc2322a3e668241473d402442435b4df837df8))
* cache media proxy data in redis for 30 mins ([2c8d138](https://github.com/zyachel/libremdb/commit/2c8d138cbd7a9d040d23bbc2d209133d0e15b41b))
* docker support for easy deployment ([b7ee686](https://github.com/zyachel/libremdb/commit/b7ee6863e5536ceb48538fde9a2fc56e2f1535bb))
* fetch images from media proxy on frontend ([dba2ba5](https://github.com/zyachel/libremdb/commit/dba2ba5aa4c04b0cb177ce058257a3a5338e7a21))
* IP ratelimit for media proxy ([720f2b6](https://github.com/zyachel/libremdb/commit/720f2b6acb39fa7f6d1149f79e46c2dbc591af7a))
* make redis cache optional ([7a717aa](https://github.com/zyachel/libremdb/commit/7a717aa212ee1284f1ec377873e232d2717c11c0))
* media proxy for anonymous loads ([59a314b](https://github.com/zyachel/libremdb/commit/59a314b2bd632faa2ceac7e430be381b23547e89))
* proxy videos and add more descriptive error messages ([1983f6b](https://github.com/zyachel/libremdb/commit/1983f6b1fb0380642c6488a0347a7073eea20338))
* update information in FAQ ([44d3a33](https://github.com/zyachel/libremdb/commit/44d3a33fb3366adafd8a629a4b11211bf7479dc8))



# [2.0.0](https://github.com/zyachel/libremdb/compare/v0.1.2...v2.0.0) (2022-10-31)


### Bug Fixes

* change to poster for og:image ([f207d68](https://github.com/zyachel/libremdb/commit/f207d688e2dc0d6c12a0b6e8f6ddc7b0eadf5e0b))
* remove double space in inspiration credit ([3f987b5](https://github.com/zyachel/libremdb/commit/3f987b59dcadbb5f931dda4d510b4c13a4ed5cd0))


### Features

* add "og:image" property for social media embeds ([d152cf4](https://github.com/zyachel/libremdb/commit/d152cf4b6210b3dd5eb33274d05695bd5593cd06))
* major rewrite ([9891204](https://github.com/zyachel/libremdb/commit/9891204f5a11eb24ad7c924f50f0e069589b82ff))


### BREAKING CHANGES

* the whole application is rewritten from scratch.



## [0.1.2](https://github.com/zyachel/libremdb/compare/v0.1.1...v0.1.2) (2022-06-06)


### Bug Fixes

* change the order in which env vars are loaded ([55c0eba](https://github.com/zyachel/libremdb/commit/55c0eba6e47c85654242173796e76205328f5f31))
* **robots.txt:** disallow all robots ([f39998d](https://github.com/zyachel/libremdb/commit/f39998d57bd2531fd1bd8b21e32ca563baf7565c))


### Performance Improvements

* implement caching of static files ([170fbab](https://github.com/zyachel/libremdb/commit/170fbabe5ef4b8cec63ca8831a4ae2a79798a6b0))



