import { makeRequest } from '../../config/api.config';
import {
  CreateSavingsRequestDto,
  GetSavingsCategoryResponseDto,
  GetSavingsSourceResponseDto,
  SavingsResponseDto,
  SavingsTypeDto,
  SingleSavingsResponseDto,
} from './savings.dto';

export class SavingsService {
  constructor(private userId: string, private customerId: string) {}
  async createSavings(data: CreateSavingsRequestDto) {
    return await makeRequest({
      method: 'POST',
      url: '/create-savings-goal',
      data: {
        ...data,
        customerId: this.customerId,
      },
    });
  }

  async getSavingsCategories() {
    return await makeRequest<GetSavingsCategoryResponseDto>({
      method: 'GET',
      url: '/get-saving-category',
    });
  }

  async getSavingsSource() {
    return await makeRequest<GetSavingsSourceResponseDto>({
      method: 'GET',
      url: '/get-saving-source',
    });
  }
  async getSavingsTypes() {
    return await makeRequest<SavingsTypeDto[]>({
      method: 'GET',
      url: '/get-savings-type',
    });
  }

  async getTotalSavings() {
    return await makeRequest<number>({
      method: 'GET',
      url: '/get-total-savings-balance?customerId=' + this.customerId,
    });
  }

  async getAccruedInterest() {
    return await makeRequest<number>({
      method: 'GET',
      url: '/get-accrued-interest?customerId=' + this.customerId,
    });
  }

  async getCustomerSavings() {
    return await makeRequest<SavingsResponseDto[]>({
      method: 'GET',
      url: '/get-customer-savings?customerId=' + this.customerId,
    });
  }

  async getCustomerSavingsById(id: string) {
    return await makeRequest<SingleSavingsResponseDto>({
      method: 'GET',
      url: `/get-single-customer-savings?goalId=${id}`,
    });
  }

  async topUpContribution(id: string, amount: string) {
    return await makeRequest<SingleSavingsResponseDto>({
      method: 'POST',
      url: `/add-contribution?goalId=${id}&amount=${amount}`,
    });
  }
}
