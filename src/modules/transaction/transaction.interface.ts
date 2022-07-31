export interface TransactionParams {
  user_id: number
  page: number
  limit: number
  month?: string
  year?: string
}

export interface TransactionSummaryParams {
  user_id: number
  type: string
  month?: string
  year?: string
}