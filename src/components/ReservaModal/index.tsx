"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { parse, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useApi } from "@/data/hooks/useApi";

import { ReserveType, Book } from "@/data/@types/reserve.type";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const ReservaModal = () => {
  const [loading, setLoading] = useState<boolean | null>(null);
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

      // date: new Date(),
      students: 0,
    },
  });
  const times = [
    {
      manha: [
        { value: "07:30", title: "07:30 - 8:30" },
        { value: "08:30", title: "08:30 - 9:30" },
        { value: "09:30", title: "09:30 - 10:30" },
        { value: "10:30", title: "10:30 - 11:30" },
      ],
      tarde: [
        { value: "13:00", title: "13:00 - 14:00" },
        { value: "14:00", title: "14:00 - 15:00" },
        { value: "15:00", title: "15:00 - 16:00" },
        { value: "16:00", title: "16:00 - 17:00" },
      ],
      noite: [
        { value: "18:00", title: "18:00 - 19:00" },
        { value: "19:00", title: "19:00 - 20:00" },
        { value: "20:00", title: "20:00 - 21:00" },
        { value: "21:00", title: "21:00 - 22:00" },
      ],
      sabado: [
        { value: "07:30", title: "07:30 - 8:30" },
        { value: "08:30", title: "08:30 - 9:30" },
        { value: "09:30", title: "09:30 - 10:30" },
        { value: "10:30", title: "10:30 - 11:30" },
      ],
    },
  ];

  const onSubmit = async (data: ReserveType) => {
    setLoading(true);
    const parsedDate = parse(data.date, "yyyy-MM-dd", new Date(), {
      locale: ptBR,
    });
    const formattedDate = format(parsedDate, "dd/MM/yyyy", { locale: ptBR });

    const response = await postData<ReserveType>(
      "agenda/reservar/663e5693a2971d24a1cc9a29",
      { ...data, date: formattedDate },
    );

    if (response.status !== 200) {
      throw new Error(
        "Não foi possivel autorizar o agendamento. Erro inesperado.",
      );
    }
    setLoading(false);

    console.log(response);
    console.log(data);
    console.log({ ...data, date: formattedDate });
  };

  return (
    <div>
      <form
        className="flex flex-col gap-6 text-zinc-600"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <Label>O que deseja Agendar?</Label>
          <select
            {...register("book")}
            className="p-2 w-full mt-1 border rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
          <div className="w-full flex flex-col gap-2 relative">
            <Label>Código da Turma (SIG):</Label>
            <input
              className="p-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

          <div className="w-full flex flex-col gap-2 relative">
            <Label>Alunos por turma:</Label>
            <input
              className="p-2 mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

        <div className="flex flex-col gap-2 relative">
          <Label>Data do agendamento:</Label>
          <input
            className="p-2 mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="date"
            {...register("date", {
              // valueAsDate: true,
              required: "Campo obrigatório",
            })}
          />
          <p className="absolute -bottom-5 text-xs text-red-400">
            {errors.date?.message}
          </p>
        </div>

        <div className="space-y-3">
          <p className="mb-4">Escolha os horários:</p>

          <div className="">
            <ul className="flex gap-2">
              <li className="flex flex-1">
                <input
                  type="checkbox"
                  id="first-option-manha"
                  value={"07:30"}
                  className="hidden peer"
                  {...register("time")}
                />
                <label
                  htmlFor="first-option-manha"
                  className="flex items-center justify-center w-full p-2 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                >
                  <p className="w-full text-sm text-center">07:30 - 08:30</p>
                </label>
              </li>
              <li className="flex flex-1">
                <input
                  type="checkbox"
                  id="second-option-manha"
                  value="08:30"
                  className="hidden peer"
                  {...register("time")}
                />
                <label
                  htmlFor="second-option-manha"
                  className="flex items-center justify-center w-full p-2 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                >
                  <p className="w-full text-sm text-center">08:30 - 09:30</p>
                </label>
              </li>
              <li className="flex flex-1">
                <input
                  type="checkbox"
                  id="third-option-manha"
                  value="09:30"
                  className="hidden peer"
                  {...register("time")}
                />
                <label
                  htmlFor="third-option-manha"
                  className="flex items-center justify-center w-full p-2 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                >
                  <p className="w-full text-sm text-center">09:30 - 10:30</p>
                </label>
              </li>
              <li className="flex flex-1">
                <input
                  type="checkbox"
                  id="fourth-option-manha"
                  value="10:30"
                  className="hidden peer"
                  {...register("time")}
                />
                <label
                  htmlFor="fourth-option-manha"
                  className="flex items-center justify-between w-full p-2 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                >
                  <p className="w-full text-sm text-center">10:30 - 11:30</p>
                </label>
              </li>
            </ul>
          </div>

          <div className="">
            <ul className="flex gap-2">
              <li className="flex flex-1">
                <input
                  type="checkbox"
                  id="first-option-tarde"
                  value={"13:00"}
                  className="hidden peer"
                  {...register("time")}
                />
                <label
                  htmlFor="first-option-tarde"
                  className="flex items-center justify-center w-full p-2 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                >
                  <p className="w-full text-sm text-center">13:00 - 14:00</p>
                </label>
              </li>
              <li className="flex flex-1">
                <input
                  type="checkbox"
                  id="second-option-tarde"
                  value="14:00"
                  className="hidden peer"
                  {...register("time")}
                />
                <label
                  htmlFor="second-option-tarde"
                  className="flex items-center justify-center w-full p-2 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                >
                  <p className="w-full text-sm text-center">14:00 - 15:00</p>
                </label>
              </li>
              <li className="flex flex-1">
                <input
                  type="checkbox"
                  id="third-option-tarde"
                  value="15:00"
                  className="hidden peer"
                  {...register("time")}
                />
                <label
                  htmlFor="third-option-tarde"
                  className="flex items-center justify-center w-full p-2 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                >
                  <p className="w-full text-sm text-center">15:00 - 16:00</p>
                </label>
              </li>
              <li className="flex flex-1">
                <input
                  type="checkbox"
                  id="fourth-option-tarde"
                  value="16:00"
                  className="hidden peer"
                  {...register("time")}
                />
                <label
                  htmlFor="fourth-option-tarde"
                  className="flex items-center justify-between w-full p-2 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                >
                  <p className="w-full text-sm text-center">16:00 - 17:00</p>
                </label>
              </li>
            </ul>
          </div>

          {/* <div className="flex items-center gap-4 py-2">
              <p className="">Tarde:</p>
              <ul className="flex w-full gap-2 md:grid-cols-2">
                <li>
                  <input
                    type="checkbox"
                    id="first-option-tarde"
                    value={"13:00"}
                    className="hidden peer"
                    {...register("time")}
                  />
                  <label
                    htmlFor="first-option-tarde"
                    className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                  >
                    <div className="block">
                      <div className="w-full">13:00 - 14:00</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="second-option-tarde"
                    value="14:00"
                    className="hidden peer"
                    {...register("time")}
                  />
                  <label
                    htmlFor="second-option-tarde"
                    className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                  >
                    <div className="block">
                      <div className="w-full">14:00 - 15:00</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="third-option-tarde"
                    value="15:00"
                    className="hidden peer"
                    {...register("time")}
                  />
                  <label
                    htmlFor="third-option-tarde"
                    className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                  >
                    <div className="block">
                      <div className="w-full">15:00 - 16:00</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="fourth-option-tarde"
                    value="16:00"
                    className="hidden peer"
                    {...register("time")}
                  />
                  <label
                    htmlFor="fourth-option-tarde"
                    className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                  >
                    <div className="block">
                      <div className="w-full">16:00 - 17:00</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div> */}
          {/* <div className="flex items-center gap-4 py-2">
              <p className="flex-1">Noite</p>
              <ul className="flex w-full gap-2 md:grid-cols-2">
                <li>
                  <input
                    type="checkbox"
                    id="first-option-noite"
                    value={"18:00"}
                    className="hidden peer"
                    {...register("time")}
                  />
                  <label
                    htmlFor="first-option-noite"
                    className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                  >
                    <div className="block">
                      <div className="w-full">18:00 - 19:00</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="second-option-noite"
                    value="19:00"
                    className="hidden peer"
                    {...register("time")}
                  />
                  <label
                    htmlFor="second-option-noite"
                    className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                  >
                    <div className="block">
                      <div className="w-full">19:00 - 20:00</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="third-option-noite"
                    value="20:00"
                    className="hidden peer"
                    {...register("time")}
                  />
                  <label
                    htmlFor="third-option-noite"
                    className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                  >
                    <div className="block">
                      <div className="w-full">20:00 - 21:00</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="fourth-option-noite"
                    value="21:00"
                    className="hidden peer"
                    {...register("time")}
                  />
                  <label
                    htmlFor="fourth-option-noite"
                    className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                  >
                    <div className="block">
                      <div className="w-full">21:00 - 22:00</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div> */}
          {/* <div className="flex items-center gap-4 py-2">
              <p className="flex-1">Sábado</p>
              <ul className="flex w-full gap-2 md:grid-cols-2">
                <li>
                  <input
                    type="checkbox"
                    id="first-option-sabado"
                    value={"08:00"}
                    className="hidden peer"
                    {...register("time")}
                  />
                  <label
                    htmlFor="first-option-sabado"
                    className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                  >
                    <div className="block">
                      <div className="w-full">08:00</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="second-option-sabado"
                    value="10:00"
                    className="hidden peer"
                    {...register("time")}
                  />
                  <label
                    htmlFor="second-option-sabado"
                    className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                  >
                    <div className="block">
                      <div className="w-full">10:00</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div> */}
        </div>

        <div className="w-full flex gap-4 lg:justify-end">
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
