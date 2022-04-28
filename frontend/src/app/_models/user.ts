export type User = {
  username: string;
  profileImage: File | undefined | string;
  email: string;
  token?: string;
  groupCode: string|null;
  prevValue: number;
  buyingPower: number;
  currValue: number;
};
