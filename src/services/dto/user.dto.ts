// export interface GetCustomerDto {
//   bvnStatus: string;
//   complianceFlag: boolean;
//   email: string;
//   fullName: string;
//   ninStatus: string;
//   niN?: string;
//   bvn?: string;
//   phoneNumber?: string;
//   contactAddress?: string | null;
// }

// export interface GetWalletResponseDto {
//   balance: number;
//   ledgerBalance: number;
// }

// export interface OrderResponseDto {
//   essentialServices: string[];
//   pageIndex: number;
//   totalPages: number;
//   totalItems: number;
//   pageSize: number;
// }

// export interface TransactionDto {
//   data: TransactionResponseDto[];
//   pageIndex: number;
//   totalPages: number;
//   totalItems: number;
//   pageSize: number;
// }

// export interface DeleteAccountDto {
//   reason: string;
//   description: string;
// }
// export interface ReportProblemDto {
//   problem: string;
//   description: string;
// }

// export interface DeleteAccountErrorResponseDto {
//   type: string;
//   title: string;
//   status: number;
//   detail: string;
//   instance: string;
// }

// export interface TransactionResponseDto {
//   id: string;
//   serviceName: string;
//   currentPaymentStatus: 'success' | 'pending' | 'failed';
//   totalAmount: number;
//   customerId: string;
//   dateInitiated: string;
//   isCompleted: boolean;
//   dateCompleted: string;
// }
// export interface RecentTransactionDto {
//   id: string;
//   serviceName: string;
//   transactionStatus: string;
//   amount: number;
//   createdAt: string;
//   description: string;
// }

// export interface CreateRecipientDto {
//   accountNumber: string;
//   bankName: string;
//   bankCode: string;
// }

// export interface CreateRecipientResponseDto {
//   recipientId: string;
// }

// export interface RequestPayoutDto {
//   amountInKobo: string;
//   reason: string;
//   recipientCode: string;
// }

// export interface InitiateTransferDto {
//   amountInKobo: string;
//   reason: string;
//   recipientCode: string;
//   otp: string;
// }

// export interface UnifiedTransactionDto {
//   page: number;
//   size: number;
//   serviceName?: string;
//   status?: string;
//   startDate?: string;
//   endDate?: string;
// }

// export interface UpdateProfileDto {
//   contactAddress: string;
//   phoneNumber: string;
// }

// export interface UnifiedTransactionResponseDto {
//   amount: number;
//   createdAt: string;
//   description: string;
//   id: string;
//   status: string;
//   type: string;
// }
// // user.dto.ts
// export interface UpdateVerificationInfoDto {
//   bvn: string;
//   nin: string;
// }

// export interface UpdateDeviceTokenDto {
//   userId: string;
//   deviceToken?: string; // Optional as it can be sent as an empty value
// }

// user.dto.ts (add API_RESPONSE type, keep DTOs as provided)


export interface API_RESPONSE<T> {
 data: T;
 status: number;
 error?: string;
}

export interface NotificationDto {
 id: string;
 userId: string;
 serviceId: string;
 serviceType: string;
 title: string;
 body: string;
 isRead: boolean;
 createAt: string;
 updateAt: string;
}

export interface SendNotificationDto {
 userId?: string;
 title: string;
 message: string;
 data?: Record<string, any>;
}

export interface SendNotificationResponseDto {
 notificationId: string;
 status: string;
}

export interface RegisterDeviceResponseDto {
 status: string;
}

export interface UnregisterDeviceResponseDto {
 status: string;
}

export interface GetTokensResponseDto {
 tokens: string[];
}

export interface ClearTokensResponseDto {
 status: string;
}

export interface MarkReadResponseDto {
 status: string;
}

export interface UnreadCountResponseDto {
 count: number; // Changed from unreadCount to match API
}

export interface DeleteNotificationResponseDto {
 status: string;
}

export interface DeleteAllNotificationsResponseDto {
 status: string;
}

export interface GetAllNotificationsResponseDto {
 notifications: NotificationDto[];
}

export interface NotificationStatsDto {
 totalNotifications: number;
 readCount: number;
 unreadCount: number;
 sentCount: number;
}

// Existing DTOs (unchanged)
export interface GetCustomerDto {
  bvnStatus: string;
  complianceFlag: boolean;
  email: string;
  fullName: string;
  ninStatus: string;
  niN?: string;
  bvn?: string;
  phoneNumber?: string;
  contactAddress?: string | null;
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

export interface ReportProblemDto {
  problem: string;
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

export interface UpdateProfileDto {
  contactAddress: string;
  phoneNumber: string;
}

export interface UnifiedTransactionResponseDto {
  amount: number;
  createdAt: string;
  description: string;
  id: string;
  status: string;
  type: string;
}

export interface UpdateVerificationInfoDto {
  bvn: string;
  nin: string;
}

export interface UpdateDeviceTokenDto {
  userId?: string;
  deviceToken?: string;
}

export interface CustomerTransactionRequestDto {
  customerId: string;
  page: number;
  size: number;
  serviceName?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}