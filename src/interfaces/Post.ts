import { BufferData } from "./User";

export default interface Post {
    _id: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
        imageMini: BufferData;
    };
    content: string;
    image: BufferData;
    likesCount: number;
    likedByUser: boolean;
    commentsCount: number;
    createdAt: Date;
    updatedAt: Date;
}
