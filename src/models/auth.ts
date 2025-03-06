export interface ProviderUserRequest {
  businessEmail: string;
  password: string;
  countryID: number;
  firstName: string;
  lastName: string;
}

export interface CustomerUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
