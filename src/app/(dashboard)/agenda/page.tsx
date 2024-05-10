"use client";
import { useEffect, useState } from "react";
import {
  IconCalendarPlus,
  IconCalendarCheck,
  IconCalendarMinus,
} from "@tabler/icons-react";
import { useFetch } from "@/data/hooks/useFetch";

import { Article } from "@/components/Article";
import Link from "next/link";
import { ReserveType } from "@/data/@types/reserve.type";

const Page = () => {
  const { getData } = useFetch();
  const [reservas, setReservas] = useState<ReserveType[]>([]);

  const loadData = async () => {
    try {
      const response = await getData<ReserveType>("/agenda");
      setReservas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Article>
      <div className="pb-4 mb-8 flex flex-col gap-8 lg:flex-row items-center justify-between border-b">
        <h1 className="font-bold flex-1 text-2xl">
          AGENDAMENTO LABORATÓRIO IDIOMAS
        </h1>
        <div className="w-full flex flex-1 lg:justify-end items-center gap-4">
          <div className="flex gap-4 items-center rounded border py-1 pl-4 focus:border border-sky-600">
            <form action="max-w-sm mx-auto">
              <label className="" htmlFor="filter">
                Filtrar
              </label>
              <select
                name="filter"
                id="filter"
                className="appearance-none border-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                <option value="">Hoje</option>
                <option value="">Semana</option>
                <option value="">Mês</option>
              </select>
            </form>
          </div>
          <div className="">
            <Link
              className="flex items-center justify-center gap-3  bg-sky-600 rounded py-3 px-4 text-white "
              href={"/agenda/reservar"}>
              <IconCalendarPlus />
              Reservar
            </Link>
          </div>
        </div>
      </div>
      <section>
        <div className="flex flex-col gap-4 ">
          {reservas?.map((reserva, index) => (
            <div className="flex flex-col p-6 lg:gap-10 lg:flex-row justify-between items-center border rounded hover:bg-zinc-50">
              <div key={index} id="card" className="flex w-full">
                <div className="w-full flex lg:justify-center flex-col lg:flex-row items-center gap-4 lg:gap-8 ">
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-zinc-500">Agendamento:</p>
                    <h2 className="text-lg font-bold text-zinc-600">
                      {reserva.date}
                    </h2>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <p className="text-zinc-500">Status</p>
                    <p
                      className={
                        reserva.status === "pending"
                          ? "bg-red-300 rounded p-1.5 text-center text-[12px] font-bold"
                          : "bg-green-300 rounded p-1.5 text-center text-[12px] font-bold"
                      }>
                      {reserva.status}
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-zinc-500">Quantidade:</p>
                    <p>{reserva.students} alunos</p>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-zinc-500">Código:</p>
                    <p>{reserva.classCode}</p>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-zinc-500">Reserva:</p>
                    <p>{reserva.book}</p>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-zinc-500">Professor</p>
                    <p>{reserva.userId}</p>
                  </div>
                </div>
              </div>
              <form action="">
                <button className="flex gap-4 p-4 cursor-pointer rounded hover:bg-sky-600 hover:text-white">
                  <IconCalendarCheck />
                  Aprovar
                </button>
              </form>
              <form action="">
                <button className="flex gap-4 p-4 cursor-pointer rounded hover:bg-red-400 hover:text-white">
                  <IconCalendarMinus />
                  Cancelar
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </Article>
  );
};

export default Page;
