export interface FundWalletRequestDto {
  customerID: string;
  amount: number;
  message: string;
  reference: string;
  status: string;
  transaction: string;
  txtRef: string;
}

export interface FundWalletByIdRequestDto {
  walletId: string;
  message: string;
  redirectUrl: string;
  reference: string;
  status: string;
  transaction: string;
  trxRef: string;
}

export interface FundWalletCallbackResponseDto {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface FundWalletResponseDto {
  id: string;
  customerID: string;
  amount: number;
  message: string;
  reference: string;
  status: string;
  transaction: string;
  txtRef: string;
  createdAt: Date;
}