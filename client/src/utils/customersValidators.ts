enum CustomersRoles {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

export interface AddressTypes {
  voivodeship: string;
  district: string;
  town: string;
  street: string;
  residence: string;
  postcode: string;
}

export interface PersonalTypes {
  name: string;
  lastname: string;
  phone: string;
}

export interface CustomersTypes {
  id: string;
  email: string;
  role: CustomersRoles;
  ordersQuantity: number;
  createdAt: string;
  address: AddressTypes;
  personal: PersonalTypes;
}

export function colorRole(status: CustomersRoles) {
  switch (status) {
    case CustomersRoles.ADMIN:
      return "text-cyan-400";
    case CustomersRoles.MODERATOR:
      return "text-amber-300";
    case CustomersRoles.USER:
      return "text-zinc-200";
  }
}
