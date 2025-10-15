export type RawReviews = {
  props: {
    pageProps: {
      contentData: {
        entityMetadata: {
          id: string
          certificate: {
            rating: string
          }
          runtime: {
            seconds: number
          }
          ratingsSummary: {
            aggregateRating: number
            voteCount: number
          }
          titleGenres: {
            genres: Array<{
              genre: {
                text: string
              }
            }>
          }
          meta: {
            canonicalId: string
            publicationStatus: string
          }
          titleType: {
            id: string
            text: string
            canHaveEpisodes: boolean
            isSeries: boolean
            isEpisode: boolean
          }
          titleText: {
            text: string
          }
          originalTitleText: {
            text: string
          }
          releaseYear: {
            year: number
            endYear: any
          }
          plot: {
            plotText: {
              plainText: string
            }
          }
          primaryImage: {
            url: string
            height: number
            width: number
            caption: {
              plainText: string
            }
          }
          series: any
          castPageTitle: {
            edges: Array<{
              node: {
                name: {
                  id: string
                  nameText: {
                    text: string
                  }
                }
              }
            }>
          }
          creatorsPageTitle: Array<any>
          directorsPageTitle: Array<{
            credits: Array<{
              name: {
                id: string
                nameText: {
                  text: string
                }
              }
            }>
          }>
          productionStatus: {
            restriction: any
            currentProductionStage: {
              id: string
            }
          }
          countriesOfOrigin: {
            countries: Array<{
              id: string
            }>
          }
          subNavCredits: {
            total: number
          }
          subNavReviews: {
            total: number
          }
          subNavTrivia: {
            total: number
          }
          subNavFaqs: {
            total: number
          }
          subNavTopQuestions: {
            total: number
          }
        }
        sidebarProps: {
          titleSidebarProps: {
            countriesOfOrigin: {
              countries: Array<{
                id: string
              }>
            }
            productionStatus: {
              restriction: any
              currentProductionStage: {
                id: string
              }
            }
          }
        }
        data: {
          title: {
            id: string
            certificate: {
              rating: string
            }
            runtime: {
              seconds: number
            }
            ratingsSummary: {
              aggregateRating: number
              voteCount: number
            }
            titleGenres: {
              genres: Array<{
                genre: {
                  text: string
                }
              }>
            }
            meta: {
              canonicalId: string
              publicationStatus: string
            }
            titleType: {
              id: string
              text: string
              canHaveEpisodes: boolean
              isSeries: boolean
              isEpisode: boolean
            }
            titleText: {
              text: string
            }
            originalTitleText: {
              text: string
            }
            releaseYear: {
              year: number
              endYear: any
            }
            plot: {
              plotText: {
                plainText: string
              }
            }
            primaryImage: {
              url: string
              height: number
              width: number
              caption: {
                plainText: string
              }
            }
            series: any
            castPageTitle: {
              edges: Array<{
                node: {
                  name: {
                    id: string
                    nameText: {
                      text: string
                    }
                  }
                }
              }>
            }
            creatorsPageTitle: Array<any>
            directorsPageTitle: Array<{
              credits: Array<{
                name: {
                  id: string
                  nameText: {
                    text: string
                  }
                }
              }>
            }>
            productionStatus: {
              restriction: any
              currentProductionStage: {
                id: string
              }
            }
            countriesOfOrigin: {
              countries: Array<{
                id: string
              }>
            }
            subNavCredits: {
              total: number
            }
            subNavReviews: {
              total: number
            }
            subNavTrivia: {
              total: number
            }
            subNavFaqs: {
              total: number
            }
            subNavTopQuestions: {
              total: number
            }
            canRate: {
              isRatable: boolean
            }
            inIframeAddLink: {
              url: string
            }
            notInIframeAddLink: {
              url: string
            }
            reviews: {
              total: number
              pageInfo: {
                endCursor: string
                hasNextPage: boolean
                hasPreviousPage: boolean
              }
              edges: Array<{
                node: {
                  id: string
                  author: {
                    username: {
                      text: string
                    }
                    userId: string
                  }
                  summary: {
                    originalText: string
                  }
                  text: {
                    originalText: {
                      plaidHtml: string
                    }
                  }
                  authorRating: number
                  submissionDate: string
                  helpfulness: {
                    upVotes: number
                    downVotes: number
                  }
                  spoiler: boolean
                  reportingLink: {
                    url: string
                  }
                }
              }>
            }
          }
        }
        canRate: boolean
        pageInfo: {
          endCursor: string
          hasNextPage: boolean
          hasPreviousPage: boolean
        }
        reviewCount: number
        reviews: Array<RawReview>
        modalContributionData: {
          tt0790724: {
            review: {
              addUrls: {
                isInIframeLink: {
                  url: string
                }
                notInIframeLink: {
                  url: string
                }
              }
            }
          }
        }
        titleText: string
      }
      isProPremiumSubscriber: boolean
    }
  }
  page: string
  query: {
    page: string
    tconst: string
  }
  buildId: string
  assetPrefix: string
  runtimeConfig: {
    env: string
    stage: string
    cachedGraphQLEndpoint: string
    graphQLEndpoint: string
    graphQLTimeout: string
    adsPublicSiteHost: string
    jwPlayerAssetEndpoint: string
    jwPlayerAssetExpirimentalEndpoint: string
  }
  isFallback: boolean
  gssp: boolean
  locale: string
  locales: Array<string>
  defaultLocale: string
  scriptLoader: Array<any>
}

export interface RawReview {
  titleId: string
  titleText: string
  review: {
    reviewId: string
    authorRating: number
    author: {
      username: {
        text: string
      }
      userId: string
    }
    reviewSummary: string
    reviewText: string
    submissionDate: string
    helpfulnessVotes: {
      upVotes: number
      downVotes: number
    }
    spoiler: boolean
  }
  isTopReview: boolean
}
