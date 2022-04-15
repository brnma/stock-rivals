export type User = {
  username: string;
  profileImage: File | undefined | string;
  name: String;
  email: string;
  token?: string;
};
