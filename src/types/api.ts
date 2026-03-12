export interface AuthResponse {
  token: string
  user_id: number
  is_new: boolean
}

export interface Profile {
  id: number
  telegram_id: number
  username: string | null
  first_name: string
  last_name: string | null
  balance: string
  referral_code: string
  referral_link: string
  referrals_count: number
  referrals_earned: string
}
