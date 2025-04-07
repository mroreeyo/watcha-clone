import { supabase } from './supabase'

export interface AuthError {
  message: string
}

export interface AuthResponse {
  success: boolean
  error?: AuthError
}

export const auth = {
  // 이메일 중복 확인
  checkEmailExists: async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
        }
      });
      
      // 에러가 없다면 이메일이 존재하는 것입니다
      return !error;
    } catch (error) {
      console.error('이메일 중복 확인 중 오류:', error);
      return false;
    }
  },

  // 회원가입
  signUp: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    try {
      // 이메일 중복 확인
      const emailExists = await auth.checkEmailExists(email);
      if (emailExists) {
        return {
          success: false,
          error: {
            message: '이미 등록된 이메일입니다.'
          }
        };
      }

      // 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          }
        }
      });
      
      if (authError) {
        console.error('회원가입 에러:', authError);
        
        // 이미 등록된 이메일인 경우
        if (authError.message === 'User already registered') {
          return {
            success: false,
            error: {
              message: '이미 등록된 이메일입니다.'
            }
          };
        }

        // 이메일 형식이 잘못된 경우
        if (authError.message.includes('Invalid email')) {
          return {
            success: false,
            error: {
              message: '올바른 이메일 형식이 아닙니다.'
            }
          };
        }

        // 비밀번호가 짧은 경우
        if (authError.message.includes('Password should be at least 6 characters')) {
          return {
            success: false,
            error: {
              message: '비밀번호는 최소 6자 이상이어야 합니다.'
            }
          };
        }

        // 기타 에러
        return {
          success: false,
          error: {
            message: '회원가입 중 오류가 발생했습니다.'
          }
        };
      }
      
      // 프로필 생성
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              email,
              name,
            }
          ]);

        if (profileError) throw profileError;
      }
      
      return { success: true }
    } catch (error) {
      console.error('회원가입 중 예외 발생:', error);
      return {
        success: false,
        error: {
          message: '회원가입 중 오류가 발생했습니다.'
        }
      }
    }
  },

  // 로그인
  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.',
        },
      }
    }
  },

  // 로그아웃
  signOut: async (): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : '로그아웃 중 오류가 발생했습니다.',
        },
      }
    }
  },

  // 현재 로그인한 사용자 정보 가져오기
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }
} 