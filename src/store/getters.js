import {CATEGORIES, IDEAS, PRODUCTS, VENDORS, SERVICES, USER, IP2LOCATION} from './modules.js'
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
    PAGE_NEWS,
} from './pages.js'

export const GETTER_ALL                      = 'GETTER_ALL'
export const GETTER_TYPE                     = 'GETTER_TYPE'
export const GETTER_PARENT_CHILDS            = 'GETTER_PARENT_CHILDS'
export const GETTER_DETAIL                   = 'GETTER_ALL'
export const GETTER_BY_ID                    = 'GETTER_BY_ID'
export const GETTER_IP                       = 'GETTER_IP'
export const GETTER_LOCATION                 = 'GETTER_LOCATION'
export const GETTER_USER                     = 'GETTER_USER'

export const CATEGORIES_GETTER_ALL           = CATEGORIES + '/' + GETTER_ALL
export const CATEGORIES_GETTER_PARENT_CHILDS = CATEGORIES + '/' + GETTER_PARENT_CHILDS
export const CATEGORIES_GETTER_DETAIL        = CATEGORIES + '/' + GETTER_DETAIL
export const CATEGORIES_GETTER_BY_ID         = CATEGORIES + '/' + GETTER_BY_ID

export const IDEAS_GETTER_ALL                = IDEAS + '/' + GETTER_ALL
export const IDEAS_GETTER_PARENT_CHILDS      = IDEAS + '/' + GETTER_PARENT_CHILDS
export const IDEAS_GETTER_DETAIL             = IDEAS + '/' + GETTER_DETAIL

export const SERVICES_GETTER_TYPE            = SERVICES + '/' + GETTER_TYPE

export const USER_GETTER_DETAIL              = USER + '/' + GETTER_DETAIL

export const IP2LOCATION_GETTER_IP           = IP2LOCATION + '/' + GETTER_IP
export const IP2LOCATION_GETTER_LOCATION     = IP2LOCATION + '/' + GETTER_LOCATION
export const IP2LOCATION_GETTER_USER         = IP2LOCATION + '/' + GETTER_USER


export const GETTER_IDEAS         = 'GETTER_IDEAS'
export const GETTER_SERVICES      = 'GETTER_SERVICES'
export const GETTER_SERVICE       = 'GETTER_SERVICE'
export const GETTER_IMAGES        = 'GETTER_IMAGES'
export const GETTER_IMAGES_META   = 'GETTER_IMAGES_META'
export const GETTER_IMAGE         = 'GETTER_IMAGE'
export const GETTER_SERVICES_META = 'GETTER_SERVICES_META'
export const GETTER_VENDOR        = 'GETTER_VENDOR'
export const GETTER_VENDOR_SERVICES = 'GETTER_VENDOR_SERVICES'
export const GETTER_VENDOR_NEWS     = 'GETTER_VENDOR_NEWS'
export const GETTER_VENDOR_GALLERY  = 'GETTER_VENDOR_GALLERY'
export const GETTER_VENDOR_PROJECTS = 'GETTER_VENDOR_PROJECTS'
export const GETTER_VENDOR_RATING   = 'GETTER_VENDOR_RATING'
export const GETTER_LOADED          = 'GETTER_LOADED'
export const GETTER_NEWS            = 'GETTER_NEWS'

export const GETTER_STATUS_FORGOT_PASSWORD  = 'GETTER_STATUS_FORGOT_PASSWORD'
export const GETTER_STATUS_CHANGE_PASSWORD  = 'GETTER_STATUS_CHANGE_PASSWORD'
export const GETTER_STATUS_CREATE_ACCOUNT  = 'GETTER_STATUS_CREATE_ACCOUNT'
export const GETTER_STATUS_LOGIN  = 'GETTER_STATUS_LOGIN'


export const GETTER_CITY     = 'GETTER_CITY'
export const GETTER_DISTRICT = 'GETTER_DISTRICT'
export const GETTER_ADDRESS  = 'GETTER_ADDRESS'

// news
// export const GETTER_NEWS               = 'GETTER_NEWS'
export const GETTER_NEWS_RELATED       = 'GETTER_NEWS_RELATED'
export const GETTER_NEWS_RECOMMEND     = 'GETTER_NEWS_RECOMMEND'
export const GETTER_NEWS_TABLE_CONTENT = 'GETTER_NEWS_TABLE_CONTENT'
export const GETTER_SERVICES_CATEGORY  = 'GETTER_SERVICES_CATEGORY'
export const GETTER_SERVICES_RELATED   = 'GETTER_SERVICES_RELATED'
export const GETTER_PRODUCTS_CATEGORY  = 'GETTER_PRODUCTS_CATEGORY'
export const GETTER_PRODUCTS_RELATED   = 'GETTER_PRODUCTS_RELATED'


export const PAGE_HOME_GETTER_IDEAS             = PAGE_HOME + '/' + GETTER_IDEAS
export const PAGE_HOME_GETTER_SERVICES          = PAGE_HOME + '/' + GETTER_SERVICES
export const PAGE_HOME_GETTER_LOADED            = PAGE_HOME + '/' + GETTER_LOADED
export const PAGE_HOME_GETTER_NEWS              = PAGE_HOME + '/' + GETTER_NEWS

export const PAGE_IDEAS_GETTER_IMAGES           = PAGE_IDEAS + '/' + GETTER_IMAGES
export const PAGE_IDEAS_GETTER_IMAGES_META      = PAGE_IDEAS + '/' + GETTER_IMAGES_META
export const PAGE_IDEAS_GETTER_IMAGE            = PAGE_IDEAS + '/' + GETTER_IMAGE
export const PAGE_IDEAS_GETTER_LOADED           = PAGE_IDEAS + '/' + GETTER_LOADED

export const PAGE_CATEGORIES_GETTER_SERVICES      = PAGE_CATEGORIES + '/' + GETTER_SERVICES
export const PAGE_CATEGORIES_GETTER_SERVICES_META = PAGE_CATEGORIES + '/' + GETTER_SERVICES_META
export const PAGE_CATEGORIES_GETTER_LOCATION      = PAGE_CATEGORIES + '/' + GETTER_LOCATION
export const PAGE_CATEGORIES_GETTER_LOADED        = PAGE_CATEGORIES + '/' + GETTER_LOADED

export const PAGE_SERVICE_GETTER_SERVICE         = PAGE_SERVICE + '/' + GETTER_SERVICE
export const PAGE_SERVICE_GETTER_VENDOR_SERVICES = PAGE_SERVICE + '/' + GETTER_VENDOR_SERVICES
export const PAGE_SERVICE_GETTER_VENDOR_NEWS     = PAGE_SERVICE + '/' + GETTER_VENDOR_NEWS
export const PAGE_SERVICE_GETTER_VENDOR_GALLERY  = PAGE_SERVICE + '/' + GETTER_VENDOR_GALLERY
export const PAGE_SERVICE_GETTER_VENDOR_PROJECTS = PAGE_SERVICE + '/' + GETTER_VENDOR_PROJECTS
export const PAGE_SERVICE_GETTER_LOADED          = PAGE_SERVICE + '/' + GETTER_LOADED
export const PAGE_SERVICE_GETTER_VENDOR_RATING   = PAGE_SERVICE + '/' + GETTER_VENDOR_RATING

export const PAGE_VENDOR_GETTER_VENDOR          = PAGE_VENDOR + '/' + GETTER_VENDOR
export const PAGE_VENDOR_GETTER_VENDOR_SERVICES = PAGE_VENDOR + '/' + GETTER_VENDOR_SERVICES
export const PAGE_VENDOR_GETTER_VENDOR_NEWS     = PAGE_VENDOR + '/' + GETTER_VENDOR_NEWS
export const PAGE_VENDOR_GETTER_VENDOR_GALLERY  = PAGE_VENDOR + '/' + GETTER_VENDOR_GALLERY
export const PAGE_VENDOR_GETTER_VENDOR_PROJECTS = PAGE_VENDOR + '/' + GETTER_VENDOR_PROJECTS
export const PAGE_VENDOR_GETTER_VENDOR_RATING   = PAGE_VENDOR + '/' + GETTER_VENDOR_RATING
export const PAGE_VENDOR_GETTER_LOADED          = PAGE_VENDOR + '/' + GETTER_LOADED

export const PAGE_POSTS_SERVICE_GETTER_CITY     = PAGE_POSTS_SERVICE + '/' + GETTER_CITY
export const PAGE_POSTS_SERVICE_GETTER_DISTRICT = PAGE_POSTS_SERVICE + '/' + GETTER_DISTRICT
export const PAGE_POSTS_SERVICE_GETTER_ADDRESS  = PAGE_POSTS_SERVICE + '/' + GETTER_ADDRESS
export const PAGE_POSTS_SERVICE_GETTER_SERVICE  = PAGE_POSTS_SERVICE + '/' + GETTER_SERVICE

export const USER_GETTER_STATUS_FORGOT_PASSWORD  = USER + '/' + GETTER_STATUS_FORGOT_PASSWORD
export const USER_GETTER_STATUS_CHANGE_PASSWORD  = USER + '/' + GETTER_STATUS_CHANGE_PASSWORD
export const USER_GETTER_STATUS_CREATE_ACCOUNT  = USER + '/' + GETTER_STATUS_CREATE_ACCOUNT
export const USER_GETTER_STATUS_LOGIN  = USER + '/' + GETTER_STATUS_LOGIN

// PAGE_NEWS
export const PAGE_NEWS_GETTER_NEWS               = PAGE_NEWS + '/' + GETTER_NEWS
export const PAGE_NEWS_GETTER_NEWS_RELATED       = PAGE_NEWS + '/' + GETTER_NEWS_RELATED
export const PAGE_NEWS_GETTER_NEWS_RECOMMEND     = PAGE_NEWS + '/' + GETTER_NEWS_RECOMMEND
export const PAGE_NEWS_GETTER_NEWS_TABLE_CONTENT = PAGE_NEWS + '/' + GETTER_NEWS_TABLE_CONTENT
export const PAGE_NEWS_GETTER_SERVICES_CATEGORY  = PAGE_NEWS + '/' + GETTER_SERVICES_CATEGORY
export const PAGE_NEWS_GETTER_SERVICES_RELATED   = PAGE_NEWS + '/' + GETTER_SERVICES_RELATED
export const PAGE_NEWS_GETTER_PRODUCTS_CATEGORY  = PAGE_NEWS + '/' + GETTER_PRODUCTS_CATEGORY
export const PAGE_NEWS_GETTER_PRODUCTS_RELATED   = PAGE_NEWS + '/' + GETTER_PRODUCTS_RELATED