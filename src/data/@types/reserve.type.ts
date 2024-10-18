import { UserType } from "./user.type";

export enum Status {
  APPROVED = "Agendado",
  PENDING = "Pendente",
  CANCELLED = "Cancelado",
}

export enum Book {
  LAB = "Laboratório",
  VR = "Oculos VR",
  CHROMEBOOK = "Chromebook",
}

export type ReserveType = {
  id: string;
  userId: string;
  date: string;
  time: [string];
  students: string;
  classCode: string;
  status: Status;
  book: Book;
  user: Pick<UserType, "id" | "name" | "role">;
};
