import {CATEGORIES, IDEAS, PRODUCTS, VENDOR, USER, LAZYLOAD, IP2LOCATION} from './modules.js'
import {
    PAGE_HOME,
    PAGE_CATEGORIES,
    PAGE_IDEAS,
    PAGE_SERVICE,
    PAGE_VENDOR,
    PAGE_POSTS_SERVICE,
    PAGE_POSTS_SEARCH_VENDOR,
    PAGE_POSTS_PRODUCT,
    PAGE_POSTS_REPORT,
    PAGE_AUTHEN,
    PAGE_NEWS
} from './pages.js'

export const MUTATION_SET_ALL         = 'MUTATION_SET_ALL'
export const MUTATION_SET_DETAIL      = 'MUTATION_SET_DETAIL'
export const MUTATION_ADD_IMAGE       = 'MUTATION_ADD_IMAGE'
export const MUTATION_REMOVE_IMAGE    = 'MUTATION_REMOVE_IMAGE'
export const MUTATION_CLEAR_ALL_IMAGE = 'MUTATION_CLEAR_ALL_IMAGE'

export const MUTATION_IP                       = 'GETTER_IP'
export const MUTATION_LOCATION                 = 'GETTER_LOCATION'
export const MUTATION_USER                     = 'GETTER_USER'

export const CATEGORIES_MUTATION_SET_ALL = CATEGORIES + '/' + MUTATION_SET_ALL
export const IDEAS_MUTATION_SET_ALL      = IDEAS + '/' + MUTATION_SET_ALL
export const USER_MUTATION_SET_DETAIL    = USER + '/' + MUTATION_SET_DETAIL

export const LAZYLOAD_MUTATION_ADD_IMAGE       = LAZYLOAD + '/' + MUTATION_ADD_IMAGE
export const LAZYLOAD_MUTATION_REMOVE_IMAGE    = LAZYLOAD + '/' + MUTATION_REMOVE_IMAGE
export const LAZYLOAD_MUTATION_CLEAR_ALL_IMAGE = LAZYLOAD + '/' + MUTATION_CLEAR_ALL_IMAGE

export const IP2LOCATION_MUTATION_IP       = IP2LOCATION + '/' + MUTATION_IP
export const IP2LOCATION_MUTATION_LOCATION = IP2LOCATION + '/' + MUTATION_LOCATION
export const IP2LOCATION_MUTATION_USER     = IP2LOCATION + '/' + MUTATION_USER

export const MUTATION_SET_IDEAS         = 'MUTATION_SET_IDEAS'
export const MUTATION_SET_SERVICES      = 'MUTATION_SET_SERVICES'
export const MUTATION_SET_NEWS          = 'MUTATION_SET_NEWS'
export const MUTATION_SET_SERVICE       = 'MUTATION_SET_SERVICE'
export const MUTATION_SET_IMAGES        = 'MUTATION_SET_IMAGES'
export const MUTATION_SET_IMAGES_META   = 'MUTATION_SET_IMAGES_META'
export const MUTATION_SET_IMAGE         = 'MUTATION_SET_IMAGE'
export const MUTATION_SET_SERVICES_META = 'MUTATION_SET_SERVICES_META'

export const MUTATION_SET_CITY            = 'MUTATION_SET_CITY'
export const MUTATION_SET_CITY_SELECTED   = 'MUTATION_SET_CITY_SELECTED'
export const MUTATION_SET_CITY_UNSELECTED = 'MUTATION_SET_CITY_UNSELECTED'
export const MUTATION_SET_DISTRICT        = 'MUTATION_SET_DISTRICT'
export const MUTATION_SET_ADDRESS         = 'MUTATION_SET_ADDRESS'

export const MUTATION_REFRESH      = 'MUTATION_REFRESH'
export const MUTATION_SET_LOADED   = 'MUTATION_SET_LOADED'

export const MUTATION_SET_LOCATION      = 'MUTATION_SET_LOCATION'
export const MUTATION_SET_VENDOR        = 'MUTATION_SET_VENDOR'
export const MUTATION_SET_VENDOR_SERVICES = 'MUTATION_SET_VENDOR_SERVICES'
export const MUTATION_SET_VENDOR_NEWS     = 'MUTATION_SET_VENDOR_NEWS'
export const MUTATION_SET_VENDOR_GALLERY  = 'MUTATION_SET_VENDOR_GALLERY'
export const MUTATION_SET_VENDOR_PROJECTS = 'MUTATION_SET_VENDOR_PROJECTS'
export const MUTATION_SET_VENDOR_RATING   = 'MUTATION_SET_VENDOR_RATING'

export const MUTATION_SET_STATUS_FORGOT_PASSWORD = 'MUTATION_SET_STATUS_FORGOT_PASSWORD'
export const MUTATION_SET_STATUS_CHANGE_PASSWORD = 'MUTATION_SET_STATUS_CHANGE_PASSWORD'
export const MUTATION_SET_STATUS_CREATE_ACCOUNT = 'MUTATION_SET_STATUS_CREATE_ACCOUNT'
export const MUTATION_SET_STATUS_LOGIN = 'MUTATION_SET_STATUS_LOGIN'

//news
// export const SET_NEWS               = 'SET_NEWS'
export const MUTATION_SET_NEWS_RELATED       = 'MUTATION_SET_NEWS_RELATED'
export const MUTATION_SET_NEWS_RECOMMEND     = 'MUTATION_SET_NEWS_RECOMMEND'
export const MUTATION_SET_NEWS_TABLE_CONTENT = 'MUTATION_SET_NEWS_TABLE_CONTENT'
export const MUTATION_SERVICES_CATEGORY      = 'MUTATION_SERVICES_CATEGORY'
export const MUTATION_SERVICES_RELATED       = 'MUTATION_SERVICES_RELATED'
export const MUTATION_PRODUCTS_CATEGORY      = 'MUTATION_PRODUCTS_CATEGORY'
export const MUTATION_PRODUCTS_RELATED       = 'MUTATION_PRODUCTS_RELATED'

export const PAGE_HOME_MUTATION_SET_IDEAS               = PAGE_HOME + '/' + MUTATION_SET_IDEAS
export const PAGE_HOME_MUTATION_SET_SERVICES            = PAGE_HOME + '/' + MUTATION_SET_SERVICES
export const PAGE_HOME_MUTATION_REFRESH                 = PAGE_HOME + '/' + MUTATION_REFRESH
export const PAGE_HOME_MUTATION_SET_NEWS                = PAGE_HOME + '/' + MUTATION_SET_NEWS

export const PAGE_IDEAS_MUTATION_SET_IMAGES             = PAGE_IDEAS + '/' + MUTATION_SET_IMAGES
export const PAGE_IDEAS_MUTATION_SET_IMAGES_META        = PAGE_IDEAS + '/' + MUTATION_SET_IMAGES_META
export const PAGE_IDEAS_MUTATION_SET_IMAGE              = PAGE_IDEAS + '/' + MUTATION_SET_IMAGE
export const PAGE_IDEAS_MUTATION_REFRESH                = PAGE_IDEAS + '/' + MUTATION_REFRESH

export const PAGE_CATEGORIES_MUTATION_SET_SERVICES      = PAGE_CATEGORIES + '/' + MUTATION_SET_SERVICES
export const PAGE_CATEGORIES_MUTATION_SET_SERVICES_META = PAGE_CATEGORIES + '/' + MUTATION_SET_SERVICES_META
export const PAGE_CATEGORIES_MUTATION_REFRESH           = PAGE_CATEGORIES + '/' + MUTATION_REFRESH
export const PAGE_CATEGORIES_MUTATION_SET_LOCATION      = PAGE_CATEGORIES + '/' + MUTATION_SET_LOCATION

export const PAGE_VENDOR_MUTATION_SET_VENDOR          = PAGE_VENDOR + '/' + MUTATION_SET_VENDOR
export const PAGE_VENDOR_MUTATION_SET_VENDOR_SERVICES = PAGE_VENDOR + '/' + MUTATION_SET_VENDOR_SERVICES
export const PAGE_VENDOR_MUTATION_SET_VENDOR_NEWS     = PAGE_VENDOR + '/' + MUTATION_SET_VENDOR_NEWS
export const PAGE_VENDOR_MUTATION_SET_VENDOR_GALLERY  = PAGE_VENDOR + '/' + MUTATION_SET_VENDOR_GALLERY
export const PAGE_VENDOR_MUTATION_SET_VENDOR_PROJECTS = PAGE_VENDOR + '/' + MUTATION_SET_VENDOR_PROJECTS
export const PAGE_VENDOR_MUTATION_SET_VENDOR_RATING   = PAGE_VENDOR + '/' + MUTATION_SET_VENDOR_RATING

export const PAGE_POSTS_SERVICE_MUTATION_SET_CITY            = PAGE_POSTS_SERVICE + '/' + MUTATION_SET_CITY
export const PAGE_POSTS_SERVICE_MUTATION_SET_CITY_SELECTED   = PAGE_POSTS_SERVICE + '/' + MUTATION_SET_CITY_SELECTED
export const PAGE_POSTS_SERVICE_MUTATION_SET_CITY_UNSELECTED = PAGE_POSTS_SERVICE + '/' + MUTATION_SET_CITY_UNSELECTED
export const PAGE_POSTS_SERVICE_MUTATION_SET_DISTRICT        = PAGE_POSTS_SERVICE + '/' + MUTATION_SET_DISTRICT
export const PAGE_POSTS_SERVICE_MUTATION_SET_ADDRESS         = PAGE_POSTS_SERVICE + '/' + MUTATION_SET_ADDRESS
export const PAGE_POSTS_SERVICE_MUTATION_SET_SERVICE         = PAGE_POSTS_SERVICE + '/' + MUTATION_SET_SERVICE

export const USER_MUTATION_SET_STATUS_FORGOT_PASSWORD = USER + '/' + MUTATION_SET_STATUS_FORGOT_PASSWORD
export const USER_MUTATION_SET_STATUS_CHANGE_PASSWORD = USER + '/' + MUTATION_SET_STATUS_CHANGE_PASSWORD
export const USER_MUTATION_SET_STATUS_CREATE_ACCOUNT  = USER + '/' + MUTATION_SET_STATUS_CREATE_ACCOUNT
export const USER_MUTATION_SET_STATUS_LOGIN           = USER + '/' + MUTATION_SET_STATUS_LOGIN

// PAGE_NEWS
export const PAGE_NEWS_MUTATION_SET_NEWS               = PAGE_NEWS + '/' + MUTATION_SET_NEWS
export const PAGE_NEWS_MUTATION_SET_NEWS_RELATED       = PAGE_NEWS + '/' + MUTATION_SET_NEWS_RELATED
export const PAGE_NEWS_MUTATION_SET_NEWS_RECOMMEND     = PAGE_NEWS + '/' + MUTATION_SET_NEWS_RECOMMEND
export const PAGE_NEWS_MUTATION_SET_NEWS_TABLE_CONTENT = PAGE_NEWS + '/' + MUTATION_SET_NEWS_TABLE_CONTENT
export const PAGE_NEWS_MUTATION_SERVICES_CATEGORY      = PAGE_NEWS + '/' + MUTATION_SERVICES_CATEGORY
export const PAGE_NEWS_MUTATION_SERVICES_RELATED       = PAGE_NEWS + '/' + MUTATION_SERVICES_RELATED
export const PAGE_NEWS_MUTATION_PRODUCTS_CATEGORY      = PAGE_NEWS + '/' + MUTATION_PRODUCTS_CATEGORY
export const PAGE_NEWS_MUTATION_PRODUCTS_RELATED       = PAGE_NEWS + '/' + MUTATION_PRODUCTS_RELATED