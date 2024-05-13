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
  _id: string;
  userId: string;
  date: string;
  time: [string];
  students: number;
  classCode: string;
  status: Status;
  book: Book;
};
