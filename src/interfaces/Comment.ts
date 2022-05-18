import { UserMini } from "./User";

export default interface CommentI {
    _id: string;
    author: UserMini;
    content: string;
    likesCount: number;
    likedByUser: boolean;
    createdAt: Date;
    updatedAt: Date;
}
