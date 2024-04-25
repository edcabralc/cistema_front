export enum Role {
  ADMIN = "admin",
  PROFESSOR = "professor",
  COORD = "coord",
}

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  recoverypasswordToken: string;
  role: Role;
};
