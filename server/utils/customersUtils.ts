import { z } from "zod";

interface PersonalTypes {
  name: string;
  lastname: string;
  phone: string;
}

interface AddressTypes {
  voivodeship: string;
  district: string;
  town: string;
  street: string;
  residence: string;
  postcode: string;
}

export interface CustomerDataTypes {
  personal: PersonalTypes;
  address: AddressTypes;
}

export const customerUpdateSchema = z.object({
  customerId: z.string().min(1, "Customer id must be provided"),
  personal: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be at most 100 characters"),
    lastname: z
      .string()
      .min(2, "Lastname must be at least 2 characters")
      .max(100, "Lastname must be at most 100 characters"),
    phone: z
      .string()
      .min(9, "Name must be at least 9 characters")
      .max(12, "Name must be at most 12 characters")
      .regex(/[0-9]{9,12}/, "Phone number must be between 9 and 12 digits"),
  }),
  address: z.object({
    voivodeship: z
      .string()
      .min(2, "Voivodeship must be at least 2 characters")
      .max(100, "Voivodeship must be at most 100 characters"),
    district: z
      .string()
      .min(2, "District must be at least 2 characters")
      .max(100, "District must be at most 100 characters"),
    town: z
      .string()
      .min(2, "Town must be at least 2 characters")
      .max(100, "Town must be at most 100 characters"),
    street: z
      .string()
      .min(2, "Street must be at least 2 characters")
      .max(100, "Street must be at most 100 characters"),
    residence: z
      .string()
      .min(1, "Residence must be at least 2 characters")
      .max(100, "Residence must be at most 100 characters"),
    postcode: z
      .string()
      .min(2, "Postcode must be at least 2 characters")
      .max(100, "Postcode must be at most 100 characters"),
  }),
});
