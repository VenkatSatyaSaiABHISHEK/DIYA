export interface OnboardingStatus {
  step: number;
  totalSteps: number;
  completed: boolean;
  businessName?: string;
}

export interface SetupBusinessRequest {
  businessName: string;
  industry: string;
  websiteUrl: string;
}
