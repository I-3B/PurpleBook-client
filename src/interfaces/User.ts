export default interface User {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    imageMini: { data: Buffer; contentType: String };
    imageFul: { data: Buffer; contentType: String };
    friends: Array<String>;
    friendRequests: Array<{ user: String; viewed: Boolean }>;
    isAdmin?: Boolean;
}
