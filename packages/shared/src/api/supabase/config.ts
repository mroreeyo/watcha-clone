interface SupabaseConfig {
  supabaseUrl: string
  supabaseAnonKey: string
}

export const config: SupabaseConfig = {
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL || '',
  supabaseAnonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || ''
}

// 환경 변수 검증
if (!config.supabaseUrl || !config.supabaseAnonKey) {
  throw new Error('Supabase 환경 변수가 설정되지 않았습니다.')
} 