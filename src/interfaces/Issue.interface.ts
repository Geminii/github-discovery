export interface IIssue {
  node: {
    id: string
    number: number
    url: string
    title: string
    createdAt: string
    author: {
      avatarUrl: string
      login: string
      url: string
    }
    bodyText: string
  }
}

export interface IIssues {
  edges: IIssue[]
  totalCount: number
}