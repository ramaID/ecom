import { Config } from 'ziggy-js'

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User
  }
  ziggy: Config & { location: string }
}

export type PaginationLink = {
  url: string | null
  label: string
  active: boolean
}

export type LaravelPaginate<T> = {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}
