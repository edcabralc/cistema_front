"use client";
import { Article } from "@/components/Article";
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
    console.log(errors);
  };

  return (
    <Article>
      <h1 className="pb-4 mb-8 font-bold text-2xl border-b">Agendamento</h1>
      <form
        className="flex flex-col gap-8 h-96 text-zinc-600 "
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="">Alunos por turma</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="number"
            placeholder="Quantidade de alunos"
            min={0}
            {...register("students", {
              required: "Campo obrigatório",
              maxLength: 24,
              valueAsNumber: true,
            })}
          />
          <p className="absolute -bottom-6 text-sm text-red-400">
            {errors.students?.message}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Código do SIG</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            placeholder="Código da turma"
            {...register("classCode", {
              required: "Campo obrigatório",
            })}
          />
          <p className="absolute -bottom-6 text-sm text-red-400">
            {errors.classCode?.message}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label>O que deseja Agendar?</label>
          <select
            {...register("book")}
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="lab">Laboratório</option>
            <option value="chromebook">Chromebook</option>
            <option value="vr">Oculos VR</option>
          </select>
          <p className="absolute -bottom-6 text-sm text-red-400">
            {errors.book?.message}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Data do agendamento</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="date"
            {...register("date", {
              required: "Campo obrigatório",
              valueAsDate: true,
            })}
          />
          <p className="absolute -bottom-6 text-sm text-red-400">
            {errors.date?.message}
          </p>
        </div>
        <button className="lg:w-1/6 bg-sky-600 p-2 text-white">Agendar</button>
      </form>
    </Article>
  );
};

export default Page;
