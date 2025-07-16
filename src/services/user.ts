import { makeRequest } from '../config/api.config';
import { AddBankDto } from '../interface/provider';
import { BankDetails } from '../models/user';
import {
  CreateRecipientDto,
  CreateRecipientResponseDto,
  DeleteAccountDto,
  GetCustomerDto,
  GetWalletResponseDto,
  InitiateTransferDto,
  OrderResponseDto,
  RecentTransactionDto,
  ReportProblemDto,
  RequestPayoutDto,
  TransactionDto,
  TransactionResponseDto,
  UnifiedTransactionDto,
  UnifiedTransactionResponseDto,
  UpdateProfileDto,
} from './dto/user.dto';

export class UserService {
  protected userId = '';
  protected customerId = '';
  constructor(customerId: string, userId: string) {
    this.customerId = customerId;
    this.userId = userId;
  }

  async getCustomer() {
    return await makeRequest<GetCustomerDto>({
      method: 'GET',
      url: `/get-customer?customerId=${this.customerId}`,
    });
  }

  async getCustomerWallet() {
    return await makeRequest<GetWalletResponseDto>({
      method: 'GET',
      url: `/wallet-balance/${this.userId}`,
    });
  }
  async getCustomerOrders(page: number, size: number) {
    return await makeRequest<OrderResponseDto>({
      method: 'GET',
      url: `/essential-services?page=${page}&size=${size}`,
    });
  }
  async getCustomerTransactions(page: number, size: number) {
    return await makeRequest<TransactionDto>({
      method: 'GET',
      url: `/transactions?customerId=${this.userId}&page=${page}&pageSize=${size}`,
    });
  }
  async addBankAccount(data: AddBankDto) {
    return await makeRequest({
      method: 'POST',
      url: `/add-bank`,
      data: {
        ...data,
        userId: this.userId,
      },
    });
  }
  async getUserBanks() {
    return await makeRequest({
      method: 'GET',
      url: `/get-banks?userId=${this.userId}`,
    });
  }

  async getUserBankDetails() {
    return await makeRequest<BankDetails>({
      method: 'GET',
      url: `/get-bank-details?userId=${this.userId}`,
    });
  }

  async deleteAccount(data: DeleteAccountDto) {
    let formData = new FormData();
    formData.append('CustomerId', this.customerId);
    formData.append('Reason', data.reason);
    formData.append('Description', data.description);

    return await makeRequest({
      method: 'POST',
      url: `/delete-account`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  }

  async reportProblem(data: ReportProblemDto) {
    return await makeRequest({
      method: 'POST',
      url: `/submit-problem`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        customerId: this.customerId,
        problem: data.problem,
        description: data.description,
      },
    });
  }

  async getTransactions() {
    return await makeRequest({
      method: 'GET',
      url: `/transactions?customerId=${this.customerId}`,
    });
  }
  async getRecentTransactions() {
    return await makeRequest<RecentTransactionDto[]>({
      method: 'POST',
      url: `/customer-transaction-recent/${this.customerId}?page=1&pageSize=5`,
    });
  }

  async createRecipient(data: CreateRecipientDto) {
    return await makeRequest<string>({
      method: 'POST',
      url: `/create-recipient?name=${data.bankName}&accountNumber=${data.accountNumber}&bankCodel=${data.bankCode}`,
    });
  }

  async requestPayout(data: RequestPayoutDto) {
    return await makeRequest<string>({
      method: 'POST',
      url: `/request-payout`,
      data: {
        ...data,
        userId: this.userId,
      },
    });
  }

  async initiateTransfer(data: InitiateTransferDto) {
    return await makeRequest<string>({
      method: 'POST',
      url: `/initiate-transfer`,
      data: {
        userId: this.userId,
        ...data,
      },
    });
  }

  async getUnifiedTransactions(data: UnifiedTransactionDto) {
    const url = data.serviceName
      ? `/get-unified-transaction-history?CustomerId=${this.customerId}&page=${data.page}&pageSize=${data.size}&serviceName=${data.serviceName}`
      : `/get-unified-transaction-history?CustomerId=${this.customerId}&page=${data.page}&pageSize=${data.size}`;
    return await makeRequest<UnifiedTransactionResponseDto[]>({
      method: 'POST',
      url: url,
      data: {
        customerId: this.customerId,
        ...data,
      },
    });
  }

  async updateProfile(data: UpdateProfileDto) {
    return await makeRequest({
      method: 'PUT',
      url: `/update-contact/${this.customerId}`,
      data,
    });
  }
}
