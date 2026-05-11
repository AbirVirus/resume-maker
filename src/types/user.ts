export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  aiCredits: number;
  createdAt: string;
}
