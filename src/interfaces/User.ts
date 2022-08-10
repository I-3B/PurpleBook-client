export interface UserMini {
    _id: string;
    firstName: String;
    lastName: String;
    imageMini: BufferData;
}
export interface friendRequestI {
    user: UserMini;
    viewed: boolean;
}
export interface UserWithStateI extends UserMini {
    friendState: string;
}
export interface RecommendI extends UserWithStateI {
    mutualFriends: number;
}
export default interface UserI extends UserMini {
    email: String;
    password: String;
    imageFul: BufferData;
    friends: Array<String>;
    friendRequests: Array<{ user: String; viewed: Boolean }>;
    isAdmin?: Boolean;
}

export interface BufferData {
    data: Buffer;
    contentType: string;
}
