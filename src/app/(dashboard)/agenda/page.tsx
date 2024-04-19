"use client";
import { useForm } from "react-hook-form";

type dataType = {
  students: number;
  classCode: string;
  book: string;
  date: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<dataType>({
    defaultValues: {
      book: "lab",
    },
  });

  const onSubmit = (data: dataType) => {
    console.log(data);
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="container flex flex-col px-6">
        <form
          className=" flex flex-col gap-3 h-96 "
          onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Alunos por turma</label>
            <input
              className="border border-slate-400 p-2"
              type="number"
              placeholder="Quantidade de alunos"
              {...register("students")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Código do SIG</label>
            <input
              className="border border-slate-400 p-2"
              type="text"
              placeholder="Código da turma"
              {...register("classCode")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>O que deseja Agendar?</p>
            <label>
              <div className="flex gap-2">
                <input {...register("book")} type="radio" value="lab" />
                Laborátorio
              </div>
            </label>
            <label>
              <div className="flex gap-2">
                <input {...register("book")} type="radio" value="chromebook" />
                Chromebooks
              </div>
            </label>
            <label>
              <div className="flex gap-2">
                <input {...register("book")} type="radio" value="vr" />
                Oculos VR
              </div>
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Data do agendamento</label>
            <input
              className="border border-slate-400 p-2"
              type="date"
              {...register("date")}
            />
          </div>
          <button className="lg:w-1/6 bg-slate-400 p-2">Agendar</button>
        </form>
      </div>
      <div></div>
    </main>
  );
};

export default Page;
