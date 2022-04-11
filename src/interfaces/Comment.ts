export default interface Comment {
    _id: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
        imageMini: { data: Buffer; contentType: string };
    };
    content: string;
    likesCount: number;
    createdAt: Date;
    updatedAt: Date;
}
