import {CATEGORIES, IDEAS, PRODUCTS, VENDORS, SERVICES} from './modules.js';

export const GET_ALL                      = 'GET_ALL';
export const GET_TYPE                      = 'GET_TYPE';
export const GET_PARENT_CHILDS            = 'GET_PARENT_CHILDS';
export const GET_DETAIL                   = 'GET_ALL';

export const CATEGORIES_GET_ALL           = CATEGORIES + '/' + GET_ALL;
export const CATEGORIES_GET_PARENT_CHILDS = CATEGORIES + '/' + GET_PARENT_CHILDS;
export const CATEGORIES_GET_DETAIL        = CATEGORIES + '/' + GET_DETAIL;

export const IDEAS_GET_ALL                = IDEAS + '/' + GET_ALL;
export const IDEAS_GET_PARENT_CHILDS      = IDEAS + '/' + GET_PARENT_CHILDS;
export const IDEAS_GET_DETAIL             = IDEAS + '/' + GET_DETAIL;

export const SERVICES_GET_TYPE            = SERVICES + '/' + GET_TYPE;