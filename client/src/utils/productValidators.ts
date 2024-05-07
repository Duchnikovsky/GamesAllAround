export interface ProductsTypes {
  id: string;
  name: string;
  price: number;
  stock: number;
  Producent: {
    name: string;
  };
}

export interface AddProductValues {
  name: string;
  price: number;
  description: string;
  producent: string;
  category: string;
  image: string;
}

export interface AddProductContextTypes {
  values: AddProductValues;
  setValues: (values: AddProductValues) => void;
  image: File | null;
  setImage: (image: File) => void;
}

export interface AddProductInputTypes {
  name: keyof AddProductValues;
  type: string;
  label: string;
  maxLength: number;
  className?: string;
}

export interface EditProductTypes {
  id: string;
  name: string;
  price: number;
  description: string;
  producent: string;
  category: string;
}

export interface EditProductContextTypes {
  values: EditProductTypes;
  setValues: (values: EditProductTypes) => void;
}

export interface EditProductsInputTypes{
  name: keyof EditProductTypes;
  type: string;
  label: string;
  maxLength: number;
  className?: string;
}