export default class UserManager{
    static usersJson = [
        {
            "u_id"      : 1,
            "name"      : "Clark",
            "email"     : "clark90@gmail.com",
            "username"  : "clark90",
            "password"  : 1234,
            "image"     : "assets/img/user_1.png"
        },
        {
            "u_id"      : 2,
            "name"      : "Mike",
            "email"     : "mike32@gmail.com",
            "username"  : "mike32",
            "password"  : 4321,
            "image"     : "assets/img/user_2.png"
        },
        {
            "u_id"      : 3,
            "name"      : "John",
            "email"     : "john6789@gmail.com",
            "username"  : "john6789",
            "password"  : 4321,
            "image"     : "assets/img/user_3.png"
        },
        {
            "u_id"      : 4,
            "name"      : "Steve",
            "email"     : "steve.mi@gmail.com",
            "username"  : "steve.mi",
            "password"  : 4321,
            "image"     : "assets/img/user_4.png"
        }
    ];

    static getRandomUser = () => {
        return UserManager.usersJson[Math.floor(Math.random() * UserManager.usersJson.length)];
    }

    static getAllUsers = () => {
        return UserManager.usersJson;
    }
}
