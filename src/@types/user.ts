export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  authToken: string | null;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export enum UserStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
}
