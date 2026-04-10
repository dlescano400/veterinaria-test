export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Pet {
  id?: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  userId: string;
  user?: User;
}
