import { BufferData, UserMini } from "./User";

export default interface PostI {
    _id: string;
    author: UserMini;
    content: string;
    image: BufferData;
    likesCount: number;
    likedByUser: boolean;
    commentsCount: number;
    createdAt: Date;
    updatedAt: Date;
}
