export default interface CommentI {
    _id: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
        imageMini: { data: Buffer; contentType: string };
    };
    content: string;
    likesCount: number;
    likedByUser: boolean;
    createdAt: Date;
    updatedAt: Date;
}
