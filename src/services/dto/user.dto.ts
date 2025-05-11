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
  data: TransactionResponseDto[];
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

export interface TransactionResponseDto {
  id: string;
  serviceName: string;
  currentPaymentStatus: 'success' | 'pending' | 'failed';
  totalAmount: number;
  customerId: string;
  dateInitiated: string;
  isCompleted: boolean;
  dateCompleted: string;
}
export interface RecentTransactionDto {
  id: string;
  serviceName: string;
  transactionStatus: string;
  amount: number;
  createdAt: string;
  description: string;
}

export interface CreateRecipientDto {
  accountNumber: string;
  bankName: string;
  bankCode: string;
}

export interface CreateRecipientResponseDto {
  recipientId: string;
}

export interface RequestPayoutDto {
  amountInKobo: string;
  reason: string;
  recipientCode: string;
}

export interface InitiateTransferDto {
  amountInKobo: string;
  reason: string;
  recipientCode: string;
  otp: string;
}

export interface UnifiedTransactionDto {
  page: number;
  size: number;
  serviceName?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}
