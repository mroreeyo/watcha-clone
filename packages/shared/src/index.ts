// shared 패키지의 진입점
export { supabase } from './api/supabase/client.js';
export { AuthService } from './services/auth/auth.service.js';
export type { AuthError, AuthResponse, UserProfile } from './types/auth.js'; 