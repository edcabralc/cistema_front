import { formatDate } from "@/helpers/formatDate";

type Props = {
  date: string;
  time: string[];
  classCode: string;
  students: string;
};

export const Content = ({ date, time, classCode, students }: Props) => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Data do agendamento:</p>
          <p>{formatDate(date)}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Horários:</p>
          <p>{time?.map((hora: string) => ` ${hora}\n `)}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Turma:</p>
          <p>{classCode}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Alunos:</p>
          <p>{students}</p>
        </div>
      </div>
    </>
  );
};
