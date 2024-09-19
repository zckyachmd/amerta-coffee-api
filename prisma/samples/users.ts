type User = {
  name: string;
  email: string;
  password: string;
};

const users: User[] = [
  {
    name: "User",
    email: "user@mail.com",
    password: "secret",
  },
  {
    name: "Admin",
    email: "admin@mail.com",
    password: "secret",
  },
];

export default users;
