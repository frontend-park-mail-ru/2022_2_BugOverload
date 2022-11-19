declare module "*.handlebars" {
    const _: Function;
    export default _;
}

declare const DOMAIN: string;

interface anyObject{
    [key: string]: any
}

//common types
interface collectionParams extends anyObject {
    tag :string;
    name :string;
}

interface componentProps extends anyObject {
    rootNode :HTMLElement;
}

//user types
interface user extends anyObject {
    avatar: string;
    nickname: string;
    password: string;
}

interface userInfo extends anyObject {
    count_collections: Number;
    count_ratings: Number;
    count_reviews: Number;
    count_views_films: Number;
    joined_date: string;
}

//person types
interface person extends anyObject{
    avatar: string;
    images: Array<string>;
}

//film types
interface ratingData extends anyObject{
    score :number;
}

interface author extends anyObject{
    avatar: string;
    count_reviews: number;
    id: number;
    nickname: string;
}

interface review extends anyObject{
    author :author;
    body: string;
    count_likes :number;
    create_time :string;
    name :string;
    type :string;
}

interface actor extends anyObject {
    avatar: string,
    character: string;
    id: number;
    name: string;
}
