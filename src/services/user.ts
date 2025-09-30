// // import { makeRequest } from '../config/api.config';
// // import { AddBankDto } from '../interface/provider';
// // import { BankDetails } from '../models/user';
// // import {
// //   CreateRecipientDto,
// //   CreateRecipientResponseDto,
// //   DeleteAccountDto,
// //   GetCustomerDto,
// //   GetWalletResponseDto,
// //   InitiateTransferDto,
// //   OrderResponseDto,
// //   RecentTransactionDto,
// //   ReportProblemDto,
// //   RequestPayoutDto,
// //   TransactionDto,
// //   TransactionResponseDto,
// //   UnifiedTransactionDto,
// //   UnifiedTransactionResponseDto,
// //   UpdateProfileDto,
// // } from './dto/user.dto';

// // export class UserService {
// //   protected userId = '';
// //   protected customerId = '';
// //   constructor(customerId: string, userId: string) {
// //     this.customerId = customerId;
// //     this.userId = userId;
// //   }

// //   async getCustomer() {
// //     return await makeRequest<GetCustomerDto>({
// //       method: 'GET',
// //       url: `/get-customer?customerId=${this.customerId}`,
// //     });
// //   }

// //   async getCustomerWallet() {
// //     return await makeRequest<GetWalletResponseDto>({
// //       method: 'GET',
// //       url: `/wallet-balance/${this.userId}`,
// //     });
// //   }
// //   async getCustomerOrders(page: number, size: number) {
// //     return await makeRequest<OrderResponseDto>({
// //       method: 'GET',
// //       url: `/essential-services?page=${page}&size=${size}`,
// //     });
// //   }
// //   async getCustomerTransactions(page: number, size: number) {
// //     return await makeRequest<TransactionDto>({
// //       method: 'GET',
// //       url: `/transactions?customerId=${this.userId}&page=${page}&pageSize=${size}`,
// //     });
// //   }
// //   async addBankAccount(data: AddBankDto) {
// //     return await makeRequest({
// //       method: 'POST',
// //       url: `/add-bank`,
// //       data: {
// //         ...data,
// //         userId: this.userId,
// //       },
// //     });
// //   }
// //   async getUserBanks() {
// //     return await makeRequest({
// //       method: 'GET',
// //       url: `/get-banks?userId=${this.userId}`,
// //     });
// //   }

// //   async getUserBankDetails() {
// //     return await makeRequest<BankDetails>({
// //       method: 'GET',
// //       url: `/get-bank-details?userId=${this.userId}`,
// //     });
// //   }

// //   async deleteAccount(data: DeleteAccountDto) {
// //     let formData = new FormData();
// //     formData.append('CustomerId', this.customerId);
// //     formData.append('Reason', data.reason);
// //     formData.append('Description', data.description);

// //     return await makeRequest({
// //       method: 'POST',
// //       url: `/delete-account`,
// //       headers: {
// //         'Content-Type': 'multipart/form-data',
// //       },
// //       data: formData,
// //     });
// //   }

// //   async reportProblem(data: ReportProblemDto) {
// //     return await makeRequest({
// //       method: 'POST',
// //       url: `/submit-problem`,
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       data: {
// //         customerId: this.customerId,
// //         problem: data.problem,
// //         description: data.description,
// //       },
// //     });
// //   }

// //   async getTransactions() {
// //     return await makeRequest({
// //       method: 'GET',
// //       url: `/transactions?customerId=${this.customerId}`,
// //     });
// //   }
// //   async getRecentTransactions() {
// //     return await makeRequest<RecentTransactionDto[]>({
// //       method: 'POST',
// //       url: `/customer-transaction-recent/${this.customerId}?page=1&pageSize=5`,
// //     });
// //   }

// //   async createRecipient(data: CreateRecipientDto) {
// //     return await makeRequest<string>({
// //       method: 'POST',
// //       url: `/create-recipient?name=${data.bankName}&accountNumber=${data.accountNumber}&bankCodel=${data.bankCode}`,
// //     });
// //   }

// //   async requestPayout(data: RequestPayoutDto) {
// //     return await makeRequest<string>({
// //       method: 'POST',
// //       url: `/request-payout`,
// //       data: {
// //         ...data,
// //         userId: this.userId,
// //       },
// //     });
// //   }

// //   async initiateTransfer(data: InitiateTransferDto) {
// //     return await makeRequest<string>({
// //       method: 'POST',
// //       url: `/initiate-transfer`,
// //       data: {
// //         userId: this.userId,
// //         ...data,
// //       },
// //     });
// //   }

// //   async getUnifiedTransactions(data: UnifiedTransactionDto) {
// //     const url = data.serviceName
// //       ? `/get-unified-transaction-history?CustomerId=${this.customerId}&page=${data.page}&pageSize=${data.size}&serviceName=${data.serviceName}`
// //       : `/get-unified-transaction-history?CustomerId=${this.customerId}&page=${data.page}&pageSize=${data.size}`;
// //     return await makeRequest<UnifiedTransactionResponseDto[]>({
// //       method: 'POST',
// //       url: url,
// //       data: {
// //         customerId: this.customerId,
// //         ...data,
// //       },
// //     });
// //   }

// //   async updateProfile(data: UpdateProfileDto) {
// //     return await makeRequest({
// //       method: 'PUT',
// //       url: `/update-contact/${this.customerId}`,
// //       data,
// //     });
// //   }
// // }


// import { makeRequest } from '../config/api.config';
// import { AddBankDto } from '../interface/provider';
// import { BankDetails } from '../models/user';
// import {
//   CreateRecipientDto,
//   CreateRecipientResponseDto,
//   DeleteAccountDto,
//   GetCustomerDto,
//   GetWalletResponseDto,
//   InitiateTransferDto,
//   OrderResponseDto,
//   RecentTransactionDto,
//   ReportProblemDto,
//   RequestPayoutDto,
//   TransactionDto,
//   TransactionResponseDto,
//   UnifiedTransactionDto,
//   UnifiedTransactionResponseDto,
//   UpdateProfileDto,
//   UpdateDeviceTokenDto, // New interface for the request body
// } from './dto/user.dto';

// export class UserService {
//   protected userId = '';
//   protected customerId = '';
//   constructor(customerId: string, userId: string) {
//     this.customerId = customerId;
//     this.userId = userId;
//   }

//   async getCustomer() {
//     return await makeRequest<GetCustomerDto>({
//       method: 'GET',
//       url: `/get-customer?customerId=${this.customerId}`,
//     });
//   }

//   async getCustomerWallet() {
//     return await makeRequest<GetWalletResponseDto>({
//       method: 'GET',
//       url: `/wallet-balance/${this.userId}`,
//     });
//   }

//   async getCustomerOrders(page: number, size: number) {
//     return await makeRequest<OrderResponseDto>({
//       method: 'GET',
//       url: `/essential-services?page=${page}&size=${size}`,
//     });
//   }

//   async getCustomerTransactions(page: number, size: number) {
//     return await makeRequest<TransactionDto>({
//       method: 'GET',
//       url: `/transactions?customerId=${this.userId}&page=${page}&pageSize=${size}`,
//     });
//   }

//   async addBankAccount(data: AddBankDto) {
//     return await makeRequest({
//       method: 'POST',
//       url: `/add-bank`,
//       data: {
//         ...data,
//         userId: this.userId,
//       },
//     });
//   }

//   async getUserBanks() {
//     return await makeRequest({
//       method: 'GET',
//       url: `/get-banks?userId=${this.userId}`,
//     });
//   }

//   async getUserBankDetails() {
//     return await makeRequest<BankDetails>({
//       method: 'GET',
//       url: `/get-bank-details?userId=${this.userId}`,
//     });
//   }

//   async deleteAccount(data: DeleteAccountDto) {
//     let formData = new FormData();
//     formData.append('CustomerId', this.customerId);
//     formData.append('Reason', data.reason);
//     formData.append('Description', data.description);

//     return await makeRequest({
//       method: 'POST',
//       url: `/delete-account`,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       data: formData,
//     });
//   }

//   async reportProblem(data: ReportProblemDto) {
//     return await makeRequest({
//       method: 'POST',
//       url: `/submit-problem`,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data: {
//         customerId: this.customerId,
//         problem: data.problem,
//         description: data.description,
//       },
//     });
//   }

//   async getTransactions() {
//     return await makeRequest({
//       method: 'GET',
//       url: `/transactions?customerId=${this.customerId}`,
//     });
//   }

//   async getRecentTransactions() {
//     return await makeRequest<RecentTransactionDto[]>({
//       method: 'POST',
//       url: `/customer-transaction-recent/${this.customerId}?page=1&pageSize=5`,
//     });
//   }

//   async createRecipient(data: CreateRecipientDto) {
//     return await makeRequest<string>({
//       method: 'POST',
//       url: `/create-recipient?name=${data.bankName}&accountNumber=${data.accountNumber}&bankCodel=${data.bankCode}`,
//     });
//   }

//   async requestPayout(data: RequestPayoutDto) {
//     return await makeRequest<string>({
//       method: 'POST',
//       url: `/request-payout`,
//       data: {
//         ...data,
//         userId: this.userId,
//       },
//     });
//   }

//   async initiateTransfer(data: InitiateTransferDto) {
//     return await makeRequest<string>({
//       method: 'POST',
//       url: `/initiate-transfer`,
//       data: {
//         userId: this.userId,
//         ...data,
//       },
//     });
//   }

//   async getUnifiedTransactions(data: UnifiedTransactionDto) {
//     const url = data.serviceName
//       ? `/get-unified-transaction-history?CustomerId=${this.customerId}&page=${data.page}&pageSize=${data.size}&serviceName=${data.serviceName}`
//       : `/get-unified-transaction-history?CustomerId=${this.customerId}&page=${data.page}&pageSize=${data.size}`;
//     return await makeRequest<UnifiedTransactionResponseDto[]>({
//       method: 'POST',
//       url: url,
//       data: {
//         customerId: this.customerId,
//         ...data,
//       },
//     });
//   }

//   async updateProfile(data: UpdateProfileDto) {
//     return await makeRequest({
//       method: 'PUT',
//       url: `/update-contact/${this.customerId}`,
//       data,
//     });
//   }

//   // New method for updating device token
//   async updateDeviceToken(data: UpdateDeviceTokenDto) {
//     let formData = new FormData();
//     formData.append('UserId', data.userId || this.userId); 
//     if (data.deviceToken) {
//       formData.append('DeviceToken', data.deviceToken);
//     }

//     return await makeRequest({
//       method: 'POST',
//       url: `/update-device-token`,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       data: formData,
//     });
//   }
// }

import { makeRequest } from '../config/api.config';
import { AddBankDto } from '../interface/provider';
import { BankDetails } from '../models/user';
import {
 API_RESPONSE,
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
 UpdateDeviceTokenDto,
 SendNotificationDto,
 SendNotificationResponseDto,
 RegisterDeviceResponseDto,
 UnregisterDeviceResponseDto,
 GetTokensResponseDto,
 ClearTokensResponseDto,
 NotificationDto,
 MarkReadResponseDto,
 UnreadCountResponseDto,
 DeleteNotificationResponseDto,
 DeleteAllNotificationsResponseDto,
 GetAllNotificationsResponseDto,
 NotificationStatsDto,
} from './dto/user.dto';

export class UserService {
 protected userId = '';
 protected customerId = '';
 constructor(customerId: string, userId: string) {
 this.customerId = customerId;
 this.userId = userId;
 }

 async getCustomer() {
 return await makeRequest<API_RESPONSE<GetCustomerDto>>({
 method: 'GET',
 url: `/get-customer?customerId=${this.customerId}`,
 });
 }

 async getCustomerWallet() {
 return await makeRequest<API_RESPONSE<GetWalletResponseDto>>({
 method: 'GET',
 url: `/wallet-balance/${this.userId}`,
 });
 }

 async getCustomerOrders(page: number, size: number) {
 return await makeRequest<API_RESPONSE<OrderResponseDto>>({
 method: 'GET',
 url: `/essential-services?page=${page}&size=${size}`,
 });
 }

 async getCustomerTransactions(page: number, size: number) {
 return await makeRequest<API_RESPONSE<TransactionDto>>({
 method: 'GET',
 url: `/transactions?customerId=${this.userId}&page=${page}&pageSize=${size}`,
 });
 }

 async addBankAccount(data: AddBankDto) {
 return await makeRequest<API_RESPONSE<any>>({
 method: 'POST',
 url: `/add-bank`,
 data: {
 ...data,
 userId: this.userId,
 },
 });
 }

 async getUserBanks() {
 return await makeRequest<API_RESPONSE<any>>({
 method: 'GET',
 url: `/get-banks?userId=${this.userId}`,
 });
 }

 async getUserBankDetails() {
 return await makeRequest<API_RESPONSE<BankDetails>>({
 method: 'GET',
 url: `/get-bank-details?userId=${this.userId}`,
 });
 }

 async deleteAccount(data: DeleteAccountDto) {
 let formData = new FormData();
 formData.append('CustomerId', this.customerId);
 formData.append('Reason', data.reason);
 formData.append('Description', data.description);

 return await makeRequest<API_RESPONSE<any>>({
 method: 'POST',
 url: `/delete-account`,
 headers: {
 'Content-Type': 'multipart/form-data',
 },
 data: formData,
 });
 }

 async reportProblem(data: ReportProblemDto) {
 return await makeRequest<API_RESPONSE<any>>({
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
 return await makeRequest<API_RESPONSE<any>>({
 method: 'GET',
 url: `/transactions?customerId=${this.customerId}`,
 });
 }

 async getRecentTransactions() {
 return await makeRequest<API_RESPONSE<RecentTransactionDto[]>>({
 method: 'POST',
 url: `/customer-transaction-recent/${this.customerId}?page=1&pageSize=5`,
 });
 }

 async createRecipient(data: CreateRecipientDto) {
 return await makeRequest<API_RESPONSE<string>>({
 method: 'POST',
 url: `/create-recipient?name=${data.bankName}&accountNumber=${data.accountNumber}&bankCodel=${data.bankCode}`,
 });
 }

 async requestPayout(data: RequestPayoutDto) {
 return await makeRequest<API_RESPONSE<string>>({
 method: 'POST',
 url: `/request-payout`,
 data: {
 ...data,
 userId: this.userId,
 },
 });
 }

 async initiateTransfer(data: InitiateTransferDto) {
 return await makeRequest<API_RESPONSE<string>>({
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
 return await makeRequest<API_RESPONSE<UnifiedTransactionResponseDto[]>>({
 method: 'POST',
 url: url,
 data: {
 customerId: this.customerId,
 ...data,
 },
 });
 }

 async updateProfile(data: UpdateProfileDto) {
 return await makeRequest<API_RESPONSE<any>>({
 method: 'PUT',
 url: `/update-contact/${this.customerId}`,
 data,
 });
 }

 async updateDeviceToken (data: UpdateDeviceTokenDto) {
 let formData = new FormData();
 formData.append('UserId', data.userId || this.userId);
 if (data.deviceToken) {
 formData.append('DeviceToken', data.deviceToken);
 }

 return await makeRequest<API_RESPONSE<any>>({
 method: 'POST',
 url: `/update-device-token`,
 headers: {
 'Content-Type': 'multipart/form-data',
 },
 data: formData,
 });
 }

 // PushNotification Endpoints

 async sendNotification(data: SendNotificationDto) {
 return await makeRequest<API_RESPONSE<SendNotificationResponseDto>>({
 method: 'POST',
 url: `/send`,
 headers: {
 'Content-Type': 'application/json',
 },
 data: {
 ...data,
 userId: data.userId || this.userId,
 },
 });
 }

 async registerDevice(data: UpdateDeviceTokenDto) {
 let formData = new FormData();
 formData.append('UserId', data.userId || this.userId);
 if (data.deviceToken) {
 formData.append('DeviceToken', data.deviceToken);
 }

 return await makeRequest<API_RESPONSE<RegisterDeviceResponseDto>>({
 method: 'POST',
 url: `/register`,
 headers: {
 'Content-Type': 'multipart/form-data',
 },
 data: formData,
 });
 }

 async unregisterDevice(data: UpdateDeviceTokenDto) {
 let formData = new FormData();
 formData.append('UserId', data.userId || this.userId);
 if (data.deviceToken) {
 formData.append('DeviceToken', data.deviceToken);
 }

 return await makeRequest<API_RESPONSE<UnregisterDeviceResponseDto>>({
 method: 'POST',
 url: `/unregister`,
 headers: {
 'Content-Type': 'multipart/form-data',
 },
 data: formData,
 });
 }

 async getTokens() {
 return await makeRequest<API_RESPONSE<GetTokensResponseDto>>({
 method: 'GET',
 url: `/tokens`,
 });
 }

 async clearTokens() {
 return await makeRequest<API_RESPONSE<ClearTokensResponseDto>>({
 method: 'DELETE',
 url: `/tokens/clear`,
 });
 }

 async getUserNotifications() {
 return await makeRequest<API_RESPONSE<NotificationDto[]>>({
 method: 'GET',
 url: `/user/${this.userId}`,
 });
 }

 async markNotificationRead(notificationId: string) {
 return await makeRequest<API_RESPONSE<MarkReadResponseDto>>({
 method: 'POST',
 url: `/mark-read/${notificationId}`,
 });
 }

 async getUnreadCount() {
 return await makeRequest<API_RESPONSE<UnreadCountResponseDto>>({
 method: 'GET',
 url: `/user/${this.userId}/unread-count`,
 });
 }

 async deleteNotification(notificationId: string) {
 return await makeRequest<API_RESPONSE<DeleteNotificationResponseDto>>({
 method: 'DELETE',
 url: `/delete/${notificationId}`,
 });
 }

 async deleteAllNotifications() {
 return await makeRequest<API_RESPONSE<DeleteAllNotificationsResponseDto>>({
 method: 'DELETE',
 url: `/user/${this.userId}/delete-all`,
 });
 }

 async getAllNotifications() {
 return await makeRequest<API_RESPONSE<GetAllNotificationsResponseDto>>({
 method: 'GET',
 url: `/all`,
 headers: {
 Authorization: `Bearer <token>`, // Replace with your auth mechanism
 },
 });
 }

 async getNotificationStats() {
 return await makeRequest<API_RESPONSE<NotificationStatsDto>>({
 method: 'GET',
 url: `/stats`,
 });
 }
}