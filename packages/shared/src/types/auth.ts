export interface AuthError {
  message: string;
}

export interface AuthResponse {
  success: boolean;
  error?: AuthError;
  message?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
} 