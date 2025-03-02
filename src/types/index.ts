interface Address {
  city: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
}

export interface UserPostForm {
  title: string;
  desc: string;
  userId: number;
}

export interface UserPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
