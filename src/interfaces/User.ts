export default interface UserI {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    imageMini: BufferData;
    imageFul: BufferData;
    friends: Array<String>;
    friendRequests: Array<{ user: String; viewed: Boolean }>;
    isAdmin?: Boolean;
}

export interface BufferData {
    data: Buffer;
    contentType: string;
}
