"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useApi } from "@/data/hooks/useApi";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Book, ReserveType } from "@/data/@types/reserve.type";
import { useAgenda } from "@/data/contexts/agenda.context";
import { useFetch } from "@/data/hooks/useFetch";
import { toast } from "@/hooks/use-toast";
import { addReserve } from "@/actions/add-reserve";

export const ReservaForm = ({ setOpen }: any) => {
  const agendaCtx = useAgenda();
  const [loading, setLoading] = useState<boolean | null>(null);
  const { updateList } = useFetch<ReserveType>("", {});
  const { postData } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReserveType>({
    defaultValues: {
      book: Book.LAB,
      classCode: "",
      time: [],
      date: "",
      students: "",
    },
  });
  const times = [
    { value: "07:30", title: "07:30 - 08:30", shift: "manha" },
    { value: "08:30", title: "08:30 - 09:30", shift: "manha" },
    { value: "09:30", title: "09:30 - 10:30", shift: "manha" },
    { value: "10:30", title: "10:30 - 11:30", shift: "manha" },

    { value: "13:00", title: "13:00 - 14:00", shift: "tarde" },
    { value: "14:00", title: "14:00 - 15:00", shift: "tarde" },
    { value: "15:00", title: "15:00 - 16:00", shift: "tarde" },
    { value: "16:00", title: "16:00 - 17:00", shift: "tarde" },

    { value: "18:00", title: "18:00 - 19:00", shift: "noite" },
    { value: "19:00", title: "19:00 - 20:00", shift: "noite" },
    { value: "20:00", title: "20:00 - 21:00", shift: "noite" },
    { value: "21:00", title: "21:00 - 22:00", shift: "noite" },

    { value: "08:00", title: "08:00 - 09:00", shift: "sabado" },
    { value: "09:00", title: "09:00 - 10:00", shift: "sabado" },
    { value: "10:00", title: "10:00 - 11:00", shift: "sabado" },
    { value: "11:00", title: "11:00 - 12:00", shift: "sabado" },
    { value: "12:00", title: "12:00 - 13:00", shift: "sabado" },
  ];

  const onSubmit = async (data: ReserveType) => {
    setLoading(true);
    const parsedDate = parse(data.date, "yyyy-MM-dd", new Date(), {
      locale: ptBR,
    });
    const formattedDate = format(parsedDate, "dd/MM/yyyy", { locale: ptBR });
    const newAgenda = { ...data, date: formattedDate, status: data.status };
    console.log(data);
    return;

    try {
      const response = await addReserve(newAgenda);

      if (response?.status !== 200) {
        toast({
          title: "Não foi possivel autorizar o agendamento. Erro inesperado.",
          description: (
            <>
              <p>
                {newAgenda.book} - {newAgenda.date}
              </p>
            </>
          ),
        });

        throw new Error(
          "Não foi possivel autorizar o agendamento. Erro inesperado."
        );
      }
      console.log(response);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    toast({
      title: "Agendamento realizado com sucesso",
      description: (
        <>
          <p>
            {newAgenda.book} - {newAgenda.date}
          </p>
        </>
      ),
    });

    setLoading(false);
  };

  // console.log(times.filter((time) => time.shift === "manha"));

  return (
    <div>
      <form
        className="flex flex-col gap-4 text-zinc-600"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">O que deseja Agendar?</Label>
          <select
            {...register("book")}
            className="mt-1 w-full rounded border border-gray-300 p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="Laboratório">Laboratório</option>
            <option value="Chromebook">Chromebook</option>
            <option value="Oculos VR">Oculos VR</option>
          </select>
          <p className="absolute -bottom-6 text-sm text-red-400">
            {errors.book?.message}
          </p>
        </div>

        <div className="flex w-full gap-8">
          <div className="relative flex w-full flex-col gap-2">
            <Label className="font-bold">Código da Turma (SIG):</Label>
            <input
              className="mt-1 block w-full rounded border border-gray-300 p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              type="text"
              placeholder="Código da turma"
              {...register("classCode", {
                required: "Campo obrigatório",
              })}
            />
            <p className="absolute -bottom-5 text-xs text-red-400">
              {errors.classCode?.message}
            </p>
          </div>

          <div className="relative flex w-full flex-col gap-2">
            <Label className="font-bold">Alunos por turma:</Label>
            <input
              className="mt-1 block w-full rounded border border-gray-300 p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Quantidade de alunos"
              type="text"
              {...register("students", {
                required: "Campo obrigatório",
                valueAsNumber: true,
              })}
            />
            <p className="absolute -bottom-5 text-xs text-red-400">
              {errors.students?.message}
            </p>
          </div>
        </div>

        <div className="relative flex flex-col gap-2">
          <Label className="font-bold">Data do agendamento:</Label>
          <input
            className="mt-1 block w-full rounded border border-gray-300 p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="date"
            {...register("date", {
              required: "Campo obrigatório",
            })}
          />
          <p className="absolute -bottom-5 text-xs text-red-400">
            {errors.date?.message}
          </p>
        </div>

        <div className="space-y-2">
          <Label className="mb-2 font-bold">Escolha os horários:</Label>

          <div className="">
            <Label className="text-xs">Manhã</Label>
            <ul className="flex gap-2">
              {times
                .filter(time => time.shift === "manha")
                .map(time => (
                  <li className="flex flex-1" key={time.value}>
                    <input
                      type="checkbox"
                      id={`${time.shift}-${time.value}`}
                      value={time.value}
                      className="peer hidden"
                      {...register("time")}
                    />
                    <label
                      htmlFor={`${time.shift}-${time.value}`}
                      className="flex w-full cursor-pointer items-center justify-center rounded border border-gray-200 bg-white p-2 hover:bg-gray-50 peer-checked:border-sky-500 peer-checked:bg-slate-100 peer-checked:text-gray-600">
                      <p className="w-full text-center text-sm">{time.title}</p>
                    </label>
                  </li>
                ))}
            </ul>
          </div>

          <div className="">
            <Label className="text-xs">Tarde</Label>
            <ul className="flex gap-2">
              {times
                .filter(time => time.shift === "tarde")
                .map(time => (
                  <li className="flex flex-1" key={time.value}>
                    <input
                      type="checkbox"
                      id={`${time.shift}-${time.value}`}
                      value={time.value}
                      className="peer hidden"
                      {...register("time")}
                    />
                    <label
                      htmlFor={`${time.shift}-${time.value}`}
                      className="flex w-full cursor-pointer items-center justify-center rounded border border-gray-200 bg-white p-2 hover:bg-gray-50 peer-checked:border-sky-500 peer-checked:bg-slate-100 peer-checked:text-gray-600">
                      <p className="w-full text-center text-sm">{time.title}</p>
                    </label>
                  </li>
                ))}
            </ul>
          </div>

          <div className="">
            <Label className="text-xs">Noite</Label>
            <ul className="flex gap-2">
              {times
                .filter(time => time.shift === "noite")
                .map(time => (
                  <li className="flex flex-1" key={time.value}>
                    <input
                      type="checkbox"
                      id={`${time.shift}-${time.value}`}
                      value={time.value}
                      className="peer hidden"
                      {...register("time")}
                    />
                    <label
                      htmlFor={`${time.shift}-${time.value}`}
                      className="flex w-full cursor-pointer items-center justify-center rounded border border-gray-200 bg-white p-2 hover:bg-gray-50 peer-checked:border-sky-500 peer-checked:bg-slate-100 peer-checked:text-gray-600">
                      <p className="w-full text-center text-sm">{time.title}</p>
                    </label>
                  </li>
                ))}
            </ul>
          </div>

          <div className="">
            <Label className="text-xs">Sábado</Label>
            <ul className="flex gap-2">
              {times
                .filter(time => time.shift === "sabado")
                .map(time => (
                  <li className="flex flex-1" key={time.value}>
                    <input
                      type="checkbox"
                      id={`${time.shift}-${time.value}`}
                      value={time.value}
                      className="peer hidden"
                      {...register("time")}
                    />
                    <label
                      htmlFor={`${time.shift}-${time.value}`}
                      className="flex w-full cursor-pointer items-center justify-center rounded border border-gray-200 bg-white p-2 hover:bg-gray-50 peer-checked:border-sky-500 peer-checked:bg-slate-100 peer-checked:text-gray-600">
                      <p className="w-full text-center text-sm">{time.title}</p>
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-2 flex w-full gap-4 lg:justify-end">
          <Button type="reset" variant={"outline"}>
            Cancelar
          </Button>
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Agendando..." : "Agendar"}
          </Button>
        </div>
      </form>
    </div>
  );
};
