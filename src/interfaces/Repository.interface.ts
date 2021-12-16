interface ITopicNode {
  node: {
    id: string;
    topic: {
      name: string;
    };
  };
}

export interface IRepositoryTopic {
  edges: ITopicNode[];
}

export interface IRepository {
  id: string;
  name: string;
  url: string;
  stargazers: {
    totalCount: number;
  };
  viewerHasStarred: boolean;
  description: string;
  licenseInfo: {
    name: string;
  };
  updatedAt: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
  primaryLanguage: {
    color: string;
    name: string;
  };
  repositoryTopics: IRepositoryTopic;
}
