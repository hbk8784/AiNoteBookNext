import { supabase } from './supabaseClient';

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignInData {
  email: string;
  password: string;
}

type AuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone: string;
    confirmation_sent_at: string;
    confirmed_at: string;
    last_sign_in_at: string;
    app_metadata: {
      provider: string;
      providers: string[];
    };
    user_metadata: {
      email: string;
      email_verified: boolean;
      name: string;
      phone_verified: boolean;
      sub: string;
    };
    identities: {
      identity_id: string;
      id: string;
      user_id: string;
      identity_data: {
        email: string;
        email_verified: boolean;
        name: string;
        phone_verified: boolean;
        sub: string;
      };
      provider: string;
      last_sign_in_at: string;
      created_at: string;
      updated_at: string;
      email: string;
    }[];
    created_at: string;
    updated_at: string;
    is_anonymous: boolean;
  };
};

export const auth = {
  
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear localStorage
    localStorage.removeItem('sb-qgmakzmguzauwtjetvnu-auth-token');
    localStorage.removeItem('supabase.auth.user');
  },

  // Get current user from localStorage
  getCurrentUser(): AuthResponse | null {
    const userStr = localStorage.getItem('sb-qgmakzmguzauwtjetvnu-auth-token');
    // console.log("straight from local storage", JSON.parse(userStr!))
    if (!userStr) return null;
    return JSON.parse(userStr);
  },

  // Get user ID
  getUserId(): string | null {
    const user = this.getCurrentUser();
    return user?.user?.id || null;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('sb-qgmakzmguzauwtjetvnu-auth-token');
  }
}; 