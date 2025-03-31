export interface GetCustomerDto {
  bvnStatus: string;
  complianceFlag: boolean;
  email: string;
  fullName: string;
  ninStatus: string;
  niN?: string;
  bvn?: string;
  phoneNumber?: string;
}

export interface GetWalletResponseDto {
  balance: number;
  ledgerBalance: number;
}
