import { makeRequest } from '../../config/api.config';
import {
  FundWalletRequestDto,
  FundWalletByIdRequestDto,
  FundWalletCallbackResponseDto,
  FundWalletResponseDto,
} from './fund-wallet.dto';

export class FundWalletService {
  constructor(private userId: string, private customerId: string) {}

  async fundWallet(data: FundWalletRequestDto) {
    return await makeRequest<FundWalletResponseDto>({
      method: 'POST',
      url: '/fund-wallet',
      data: {
        ...data,
        customerID: this.customerId,
      },
    });
  }

  async fundWalletById(data: FundWalletByIdRequestDto) {
    return await makeRequest<FundWalletResponseDto>({
      method: 'POST',
      url: `/fund-wallet/${data.walletId}`,
      data: {
        message: data.message,
        redirectUrl: data.redirectUrl,
        reference: data.reference,
        status: data.status,
        transaction: data.transaction,
        trxRef: data.trxRef,
      },
    });
  }

  async fundWalletCallback(reference: string) {
    return await makeRequest<FundWalletCallbackResponseDto>({
      method: 'POST',
      url: `/fund-wallet-callback?reference=${reference}`,
    });
  }
}