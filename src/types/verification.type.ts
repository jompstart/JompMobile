export type CustomerVerificationType = 'nin' | 'bvn';
export interface CustomerVerification {
  nin: string;
  bvn: string;
}
export interface CustomerVerificationResponse {
  nin: string;
  bvn: string;
  isVerified: boolean;
}
