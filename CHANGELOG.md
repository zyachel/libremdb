# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [3.4.0](https://github.com/zyachel/libremdb/compare/v3.3.1...v3.4.0) (2024-03-31)


### Features

* **reviews:** add reviews route ([dc42b32](https://github.com/zyachel/libremdb/commit/dc42b3204caf843d0f07fa28572c5ed275bb601d))


### Bug Fixes

* **instances:** fix urls in instances.json ([3eb5178](https://github.com/zyachel/libremdb/commit/3eb517849f279b2453579d0b5c5000e803a13bca))

## [3.3.1](https://github.com/zyachel/libremdb/compare/v3.3.0...v3.3.1) (2024-01-06)


### Bug Fixes

* **dockerfile:** fix failing docker build ([719f42b](https://github.com/zyachel/libremdb/commit/719f42b5e6f6bafc0807986b6198dbbe1cb271ab))

## [3.3.0](https://github.com/zyachel/libremdb/compare/v3.2.0...v3.3.0) (2023-12-07)


### Features

* **api:** add a catch-all route ([9fdd731](https://github.com/zyachel/libremdb/commit/9fdd7311368411d59784977f77d1af103ae16543))
* **api:** add api endpoints for dynamic routes ([19f1700](https://github.com/zyachel/libremdb/commit/19f1700a55867c1fb8d6c11431bd4557e7520de1))


### Bug Fixes

* **api:** refactor all endpoints a bit ([4dffbbc](https://github.com/zyachel/libremdb/commit/4dffbbc0ec870a8f9a56e4ee62e6a6c472552f6a))
* **title:** fix title route crash ([a5b7d52](https://github.com/zyachel/libremdb/commit/a5b7d527833a67f40f992c13bbe391884c0d1f82))

## [3.2.0](https://github.com/zyachel/libremdb/compare/v3.1.1...v3.2.0) (2023-10-28)


### Features

* **list:** add list route ([97f1432](https://github.com/zyachel/libremdb/commit/97f1432ac5d23206229d806b7cb3e04af6dec36f))

## [3.1.1](https://github.com/zyachel/libremdb/compare/v3.1.0...v3.1.1) (2023-10-14)


### Bug Fixes

* **card:** fix long attributes in cards under 'Known For' section ([736d680](https://github.com/zyachel/libremdb/commit/736d6802430a3f4f364915f3df93fc548a51ebf1))
* **error:** fix incorrect 'view on IMDb' link on error page ([0aea2f4](https://github.com/zyachel/libremdb/commit/0aea2f47dad6eb78e319ea1abd8c444f2cba4424))
* **media proxy:** fix 304 response code with body error ([c610ef4](https://github.com/zyachel/libremdb/commit/c610ef4d1be39c122715a0eb200155537e7d6abf))
* **name:** fix name route crash ([38ed0c6](https://github.com/zyachel/libremdb/commit/38ed0c62177532b93f61af4172ffa6e5b9995bdc))
* **name:** fix route crash for some ids ([e91c313](https://github.com/zyachel/libremdb/commit/e91c313f127632f1bd44d190af71bc841bbe87b7))
* **title:** fix a crash in title route ([21a1c83](https://github.com/zyachel/libremdb/commit/21a1c83d95b703fa08cdb96c206626f22d5366c9))

## [3.1.0](https://github.com/zyachel/libremdb/compare/v3.0.0...v3.1.0) (2023-05-21)


### Features

* **cache:** implement caching of routes ([c53c88d](https://github.com/zyachel/libremdb/commit/c53c88db9bf98258547e2ca512f864800821cb1f))


### Bug Fixes

* **form:** fix hydration error ([8599ae2](https://github.com/zyachel/libremdb/commit/8599ae2c5ac11f2818f56c9f7de7666a38b4386c))
* **name:** fix a couple of crashes in name and title route ([8d9b663](https://github.com/zyachel/libremdb/commit/8d9b6630a576b7e8331eb5431cd90d02733b4917))

## [3.0.0](https://github.com/zyachel/libremdb/compare/v2.4.0...v3.0.0) (2023-04-15)


### ⚠ BREAKING CHANGES

* **title:** older versions won't work, at least for title route

### Features

* add info related to the current instance ([2c5d2f8](https://github.com/zyachel/libremdb/commit/2c5d2f86e46a52223f07d573b152bad5174ee2d9))
* **route:** add name route ([75732e0](https://github.com/zyachel/libremdb/commit/75732e00869f9777e87e767a48648996345f02f7))


### Bug Fixes

* **title:** fix title page crash ([8ce02d0](https://github.com/zyachel/libremdb/commit/8ce02d02364c8e1f03a8b16594bc20ee6766a8c6))

# [2.4.0](https://github.com/zyachel/libremdb/compare/v2.3.1...v2.4.0) (2023-01-22)


### Bug Fixes

* fix app crash ([71d1d5b](https://github.com/zyachel/libremdb/commit/71d1d5b34e2866729ae0c96c59ea51e8d1a3dcca))


### Features

* add error boundary ([5cc2ef0](https://github.com/zyachel/libremdb/commit/5cc2ef02cec0b31c5d449e189a054fbef5801f60))



## [2.3.1](https://github.com/zyachel/libremdb/compare/v2.3.0...v2.3.1) (2023-01-15)


### Bug Fixes

* fix unseekable videos on webkit-based browsers ([a32785c](https://github.com/zyachel/libremdb/commit/a32785ce00b638e9079f0924fd9b00f98c077348))



# [2.3.0](https://github.com/zyachel/libremdb/compare/v2.2.2...v2.3.0) (2022-12-31)


### Bug Fixes

* couple css improvements for webkit-based browsers ([81eaf2f](https://github.com/zyachel/libremdb/commit/81eaf2fd5e5980c0c4d59a8805cf541fa8fe51f9))


### Features

* **search:** add basic search functionality ([0cff34a](https://github.com/zyachel/libremdb/commit/0cff34a766b09ba17be2a89f6290889dbf225436))



## [2.2.2](https://github.com/zyachel/libremdb/compare/v2.2.1...v2.2.2) (2022-12-10)


### Bug Fixes

* app crash on qutebrowser ([78b14ec](https://github.com/zyachel/libremdb/commit/78b14ec07955d29403b8b5ae0d449f38eea2bbc5))



## [2.2.1](https://github.com/zyachel/libremdb/compare/v2.2.0...v2.2.1) (2022-12-01)


### Bug Fixes

* **title:** fix site crash ([dd75df0](https://github.com/zyachel/libremdb/commit/dd75df01eb7c03d8945a8bd20ed231a66bd88b8f))
