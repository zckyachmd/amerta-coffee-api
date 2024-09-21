type User = {
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  avatar_url?: string;
};

const users: User[] = [
  {
    name: "User",
    email: "user@mail.com",
    password: "secret",
    address: "Gang Viral No. 99, Jakarta",
    phone: "081234567890",
    avatar_url: "https://placehold.co/300x300/FFFFFF/000000/?text=U",
  },
  {
    name: "Admin",
    email: "admin@mail.com",
    password: "secret",
    address: "Jl. Chill No. 88, Bandung",
    phone: "082345678901",
    avatar_url: "https://placehold.co/300x300/FFFFFF/000000/?text=A",
  },
];

export default users;
