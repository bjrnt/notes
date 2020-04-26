export interface PostLink {
  id: string;
  title: string;
  context: string;
}

export interface Post {
  id: string;
  title: string;
  contents: string;
  outboundLinks: PostLink[];
  inboundLinks: PostLink[];
}
