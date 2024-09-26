"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { parse, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useApi } from "@/data/hooks/useApi";

import { Article } from "@/components/Article";
import { Header } from "@/components/Header";
import { ReserveType, Book } from "@/data/@types/reserve.type";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/Form";

const Page = () => {
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
    <Article>
      <Header title="Agendamento">
        <Button asChild variant="secondary">
          <Link
            className="self-end flex items-center justify-center gap-3"
            href={"/agenda"}
          >
            <IconArrowLeft />
            Voltar
          </Link>
        </Button>
      </Header>

      <form
        className="flex flex-col space-3 h-96 text-zinc-600 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <Label>O que deseja Agendar?</Label>
          <Form.select />
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
        {/* <div className="flex flex-col gap-2">
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
        </div> */}

        <div className="">
          <p className="mb-4">Escolha os horários:</p>
          <div className="flex flex-col">
            <div className="flex flex-col gap-4 border p-6 rounded">
              <div className="flex items-center gap-4 py-2">
                <p className="">Manhã</p>
                <ul className="flex gap-2">
                  <li>
                    <input
                      type="checkbox"
                      id="first-option-manha"
                      value={"07:30"}
                      className="hidden peer"
                      {...register("time")}
                    />
                    <label
                      htmlFor="first-option-manha"
                      className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                    >
                      <div className="block">
                        <div className="w-full">07:30 - 8:30</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="second-option-manha"
                      value="08:30"
                      className="hidden peer"
                      {...register("time")}
                    />
                    <label
                      htmlFor="second-option-manha"
                      className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                    >
                      <div className="block">
                        <div className="w-full">08:30 - 09:30</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="third-option-manha"
                      value="09:30"
                      className="hidden peer"
                      {...register("time")}
                    />
                    <label
                      htmlFor="third-option-manha"
                      className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                    >
                      <div className="block">
                        <div className="w-full">09:30 - 10:30</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="fourth-option-manha"
                      value="10:30"
                      className="hidden peer"
                      {...register("time")}
                    />
                    <label
                      htmlFor="fourth-option-manha"
                      className="inline-flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-200 rounded cursor-pointer peer-checked:border-sky-500 peer-checked:text-gray-600 peer-checked:bg-slate-100 hover:bg-gray-50"
                    >
                      <div className="block">
                        <div className="w-full">10:30 - 11:30</div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-4 py-2">
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
              </div>
              <div className="flex items-center gap-4 py-2">
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
              </div>
              <div className="flex items-center gap-4 py-2">
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
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex  gap-6 lg:justify-end">
          <Button type="reset" variant={"outline"}>
            Cancelar
          </Button>
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Agendando..." : "Agendar"}
          </Button>
          {/* <button className="w-6/12 bg-sky-600 rounded p-2 text-white lg:w-1/6 disabled:bg-sky-300"></button> */}
        </div>
      </form>
    </Article>
  );
};

export default Page;
