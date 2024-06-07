"use client";
import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { parse, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useFetch } from "@/data/hooks/useFetch";
import { useShifts } from "@/data/hooks/useShifts";

import { Article } from "@/components/Article";
import { ReserveType, Book } from "@/data/@types/reserve.type";
interface ExtendedReserveType extends ReserveType {
  shifts: [string] | any;
}

const Page = () => {
  // const { postData } = useFetch();
  const { shifts, setShifts, setTimeShifts } = useShifts();
  console.log(shifts);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExtendedReserveType>({
    defaultValues: {
      book: Book.LAB,
      classCode: "",
      time: [],
      shifts: [],
      // date: new Date(),
      students: 0,
    },
  });

  const turnos = watch(["shifts"]);
  const teste = setTimeShifts(turnos[0]);
  console.log("teste: ", teste);
  console.log("turnos: ", turnos);

  useEffect(() => {
    setValue("shifts", teste);
  }, []);

  const onSubmit = async (data: ExtendedReserveType) => {
    const parsedDate = parse(data.date, "yyyy-MM-dd", new Date(), {
      locale: ptBR,
    });
    const formattedDate = format(parsedDate, "dd/MM/yyyy", { locale: ptBR });
    // const response = await postData<ReserveType>(
    //   "agenda/reservar/663e5693a2971d24a1cc9a29",
    //   { ...data, date: formattedDate }
    // );
    // console.log(response);
    // console.log(data);
    console.log({ ...data, date: formattedDate });
  };

  return (
    <Article>
      <div className="pb-4 mb-8 flex items-center justify-between border-b">
        <h1 className=" font-bold text-2xl">Agendamento</h1>
        <Link
          className="self-end flex items-center justify-center gap-3  w-6/12 border border-sky-600 rounded p-2 hover:bg-sky-600 hover:text-white ease-in transition delay-75 lg:w-1/6"
          href={"/agenda"}
        >
          <IconArrowLeft />
          Voltar
        </Link>
      </div>
      <form
        className="flex flex-col gap-8 h-96 text-zinc-600 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label>O que deseja Agendar?</label>
          <select
            {...register("book")}
            className="block w-full mt-1 rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="Laboratório">Laboratório</option>
            <option value="Chromebook">Chromebook</option>
            <option value="Oculos VR">Oculos VR</option>
          </select>
          <p className="absolute -bottom-6 text-sm text-red-400">
            {errors.book?.message}
          </p>
        </div>

        <div className="w-full flex gap-8">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="">Código da Turma (SIG):</label>
            <input
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

          <div className="w-full flex flex-col gap-2 relative">
            <label htmlFor="">Alunos por turma:</label>
            <input
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              type="number"
              placeholder="Quantidade de alunos"
              min={0}
              {...register("students", {
                required: "Campo obrigatório",
                maxLength: 24,
              })}
            />
            <p className="absolute -bottom-6 text-sm text-red-400">
              {errors.students?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="">Data do agendamento:</label>
          <input
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="date"
            {...register("date", {
              // valueAsDate: true,
              required: "Campo obrigatório",
            })}
          />
          <p className="absolute -bottom-6 text-sm text-red-400">
            {errors.date?.message}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p>Horário do agendamento:</p>
          <select
            {...register("shifts")}
            name="shifts"
            id="shifts"
            className="block w-full mt-1 rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="manha">Manhã</option>
            <option value="tarde">Tarde</option>
            <option value="noite">Noite</option>
            <option value="sabado">Sábado</option>
          </select>
        </div>

        <div>
          <p className="mb-4">Escolha os horários:</p>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                type="checkbox"
                id="first-option"
                value={teste?.[0]}
                className="hidden peer"
                {...register("time")}
              />
              <label
                htmlFor="first-option"
                className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
              >
                <div className="block">
                  <div className="w-full">{teste?.[0]}</div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="second-option"
                value={teste?.[1]}
                className="hidden peer"
                {...register("time")}
              />
              <label
                htmlFor="second-option"
                className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
              >
                <div className="block">
                  <div className="w-full">{teste?.[1]}</div>
                </div>
              </label>
            </li>
          </ul>
        </div>

        <div className="w-full flex  gap-6 lg:justify-end">
          <button
            type="reset"
            className="w-6/12 bg-slate-100 border border-slate-400 rounded p-2 lg:w-1/6"
          >
            Cancelar
          </button>
          <button className="w-6/12 bg-sky-600 rounded p-2 text-white lg:w-1/6">
            Agendar
          </button>
        </div>
      </form>
    </Article>
  );
};

export default Page;
