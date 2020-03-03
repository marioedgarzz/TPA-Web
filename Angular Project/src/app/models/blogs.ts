export class BlogCategories {
    BlogCategoryId : number;
    BlogCategoryName : string;
}

export class Blogs {
    BlogId : number;
    BlogThumbnail : string;
    BlogTitle : string;
    BlogCategory : BlogCategories;
    BlogContent : string;
    BlogViewCount : number;
}