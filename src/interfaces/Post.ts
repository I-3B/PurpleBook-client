export default interface Post {
    _id: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
        imageMini: { data: Buffer; contentType: string };
    };
    content: string;
    image: { data: string; contentType: string };
    likesCount: number;
    likedByUser: boolean;
    commentsCount: number;
    createdAt: Date;
    updatedAt: Date;
}
