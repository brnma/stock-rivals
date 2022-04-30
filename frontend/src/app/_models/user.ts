export type User = {
  username: string;
  profileImage: File | undefined | string;
  email: string;
  rank: number;
  // accountValue: number; //TODO base ranking of this value
  // previousValue: number;
  token?: string;
  groupCode: string|null;
  prevValue: number;
  buyingPower: number;
  currValue: number;
};
