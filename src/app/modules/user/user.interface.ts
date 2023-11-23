// Type full name
export type TFullName = {
  firstName: string;
  lastName: string;
};
// Type address
export type TAddress = {
  street: string;
  city: string;
  country: string;
};

// order type

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
};
