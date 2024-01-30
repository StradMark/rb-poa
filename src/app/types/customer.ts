export interface CustomerDetail {
    id: string;
    initials?: string | null;
    surnamePrefix?: string | null;
    surname: string;
    sex: Sex;
    birthDate?: string | null;
    streetName?: string | null;
    postalCode: string;
    houseNumber: string;
    houseNumberExtension?: string | null;
  }
  
  export type Sex = 'male' | 'female'