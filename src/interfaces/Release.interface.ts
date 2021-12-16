export interface IRelease {
  node: {
    id: string
    url: string
    tagName: string
    createdAt: string
  }
}

export interface IReleases {
  edges: IRelease[]
  totalCount: number
}
