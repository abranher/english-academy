export interface Platform {
  id: string;
  name: string;
  description: string | null;
  supportEmail: string | null;
  supportPhone: string | null;
  socialMedia: [] | null;
  maintenanceMode: boolean;

  mobilePaymentId: string;

  createdAt: Date;
  updatedAt: Date;
}
