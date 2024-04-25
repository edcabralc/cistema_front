export enum Status {
  APPROVED = "approved",
  PENDING = "pending",
  CANCELLED = "cancelled",
}

export enum Book {
  LAB = "lab",
  VR = "vr",
  CHROMEBOOK = "chromebook",
}

export type ReserveType = {
  id: string;
  userId: string;
  date: string;
  time: string[];
  students: number;
  classCode: string;
  status: Status;
  book: Book;
};
