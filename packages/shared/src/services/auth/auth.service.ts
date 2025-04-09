import { supabase } from '../../api/supabase/client.js';
import type { AuthResponse, UserProfile } from '../../types/auth.js';

export class AuthService {
  static supabase = supabase;

  static async checkEmailExists(email: string): Promise<boolean> {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
        }
      });
      
      return !error;
    } catch (error) {
      console.error('이메일 중복 확인 중 오류:', error);
      return false;
    }
  }

  static async signUp(email: string, password: string, name: string): Promise<AuthResponse> {
    try {
      const emailExists = await this.checkEmailExists(email);
      if (emailExists) {
        return {
          success: false,
          error: {
            message: '이미 등록된 이메일입니다.'
          }
        };
      }

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
        
        if (authError.message === 'User already registered') {
          return {
            success: false,
            error: {
              message: '이미 등록된 이메일입니다.'
            }
          };
        }

        if (authError.message.includes('Invalid email')) {
          return {
            success: false,
            error: {
              message: '올바른 이메일 형식이 아닙니다.'
            }
          };
        }

        if (authError.message.includes('Password should be at least 6 characters')) {
          return {
            success: false,
            error: {
              message: '비밀번호는 최소 6자 이상이어야 합니다.'
            }
          };
        }

        return {
          success: false,
          error: {
            message: '회원가입 중 오류가 발생했습니다.'
          }
        };
      }
      
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
  }

  static async signIn(email: string, password: string): Promise<AuthResponse> {
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
  }

  static async signOut(): Promise<AuthResponse> {
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
  }

  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }

  static async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      return {
        success: true,
        message: '비밀번호 재설정 이메일이 발송되었습니다. 이메일을 확인해주세요.'
      };
    } catch (error) {
      console.error('비밀번호 재설정 중 오류:', error);
      return {
        success: false,
        error: {
          message: '비밀번호 재설정 이메일 발송에 실패했습니다.'
        }
      };
    }
  }

  static async updatePassword(newPassword: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      return {
        success: true,
        message: '비밀번호가 성공적으로 변경되었습니다.'
      };
    } catch (error) {
      console.error('비밀번호 변경 중 오류:', error);
      return {
        success: false,
        error: {
          message: '비밀번호 변경에 실패했습니다.'
        }
      };
    }
  }
} 