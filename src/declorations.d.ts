declare module "*.handlebars" {
    const _: Function;
    export default _;
}

declare module "*.svg" {
    const content: any;
    export default content;
}

declare const DOMAIN: string;

interface anyObject{
    [key: string]: any
}

//common types
interface collectionParams {
    target: string,
    key: string,
    sortParam: 'rating'|'date',
    countFilms: number,
    delimiter: number,
    name?: string,
}

interface collectionUserParams {
    id: number,
    sort?: string,
}

interface componentProps extends anyObject {
    rootNode: HTMLElement,
}

interface searchParams extends anyObject {
    request: string,
}

interface searchResponse {
    films: Array<filmPremiere>,
    serials: Array<filmPremiere>,
    persons: Array<filmPremiere>,
}

//user types
interface user extends anyObject {
    avatar: string,
    nickname: string,
    password: string,
    oldPassword?: string,
    confirmPassword?: string,
    email?: string,
}

interface userInfo extends anyObject {
    count_collections: Number;
    count_ratings: Number;
    count_reviews: Number;
    count_views_films: Number;
    joined_date: string;
}

interface userCollsParams {
    sort_param: string,
    count_collections: number,
    delimiter: string,
}

interface userCollection {
    count_films: number,
    count_likes: number,
    create_time: string,
    id: number,
    name: string,
    poster: string,
    update_time: string,
}

interface userCollListItem {
    id: number,
    is_used: boolean,
    name: string,
}

interface filmToCollParams {
    idFilm: number|string,
    idCollection: number,
}

//person types
interface person extends anyObject {
    avatar: string;
    images: Array<string>;
}

//film types
interface film extends anyObject {
    end_year: number,
    genres: Array<string>,
    id: number,
    name: string,
    poster_ver: string,
    prod_year: number,
    rating: number,
}

interface metaDateParams extends anyObject {
    filmID: number,
}

interface previewParams extends anyObject {
    name: string,
}

interface reviewParams extends anyObject {
    filmID: number,
    count: number,
    offset: number,
}

interface rateParams extends anyObject {
    filmID: number,
    rate?: string,
}

interface fullDetails extends anyObject {
    prod_year: number,
    end_year?: number,
    actors: Array<actor>,
    directors: Array<actor>,
    composers?: Array<actor>,
    operators?: Array<actor>,
    montage?: Array<actor>,
    writers?: Array<actor>,
    producers?: Array<actor>,
    rating: number,
    slogan?: string,
    age_limit?: string,
    box_office?: string,
    budget?: string,
    currency_budget?: string,
    count_seasons?: string,
    count_ratings: string,
    count_main_actors: string,
    count_actors?: string,
    duration?: string,
    genres: Array<string>,
    prod_companies: Array<string>,
    prod_countries: Array<string>,
}

interface ratingParams extends anyObject {
    score: number;
}

interface author extends anyObject {
    avatar: string;
    count_reviews: number;
    id: number;
    nickname: string;
}

interface review extends anyObject {
    author?: author;
    body: string;
    count_likes?: number;
    create_time?: string;
    name: string;
    type: string;
}

interface actor extends anyObject {
    avatar?: string,
    character?: string;
    id: number;
    name: string;
}

// premiere types
interface filmPremiere extends anyObject {
    id: number,
    poster_hor: string,
    name: string,
    prod_year: string,
    genres: Array<string>,
    prod_countries: Array<string>,
    directors: Array<actor>,
    duration: number,
    rating: number,
    description: string,
}

interface premiereParams extends anyObject {
    countFilms: number,
    delimiter: number,
}
