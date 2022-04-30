export type User = {
  username: string;
  profileImage: File | undefined | string;
  name: string; // TODO remove later
  email: string;
  rank: number;
  accountValue: number; //TODO base ranking of this value
  previousValue: number;
  token?: string;
};
