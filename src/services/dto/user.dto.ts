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

export interface OrderResponseDto {
  essentialServices: string[];
  pageIndex: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export interface TransactionDto {
  data: string[];
  pageIndex: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export interface DeleteAccountDto {
  reason: string;
  description: string;
}

export interface DeleteAccountErrorResponseDto {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}
