declare namespace App.Data {
  export type AuthorData = {
    id: string
    name: string
  }
  export type BookData = {
    id?: string
    title: string
    year: string
    author_id?: string
    author?: App.Data.AuthorData | string
  }
  export type ServiceResponseData = {
    type: string
    message: string
  }
}
