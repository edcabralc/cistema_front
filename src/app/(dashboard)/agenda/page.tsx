"use client";
import { useEffect, useState } from "react";
import { IconCalendarPlus } from "@tabler/icons-react";
import Link from "next/link";

import { useFetch } from "@/data/hooks/useFetch";

import { ReserveType } from "@/data/@types/reserve.type";

import { Article } from "@/components/Article";
import { Card } from "@/components/Card";

const Page = () => {
  const { getData } = useFetch();
  const [reservas, setReservas] = useState<ReserveType[]>([]);

  const loadData = async () => {
    try {
      const response = await getData<ReserveType>("agenda");

      if (response.status !== 200) {
        throw new Error("Erro ao carregar os dados");
      }

      console.log(response);
      setReservas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const compare = (a: any, b: any) => {
    const dateA = new Date(a.date.replace(/-/g, "/"));
    const dateB = new Date(b.date.replace(/-/g, "/"));

    return dateB - dateA;
  };

  return (
    <Article>
      <div className="pb-4 mb-8 flex flex-col gap-8 lg:flex-row items-center justify-between border-b">
        <h1 className="font-bold flex-1 text-2xl">
          AGENDAMENTO LABORATÓRIO IDIOMAS
        </h1>
        <div className="w-full flex flex-1 lg:justify-end items-center gap-4">
          <div className="flex gap-4 items-center rounded border py-1 pl-4 focus:border border-sky-600">
            <form action="max-w-sm mx-auto">
              <select
                name="filter"
                id="filter"
                className="appearance-none border-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value="">Hoje</option>
                <option value="">Semana</option>
                <option value="">Mês</option>
              </select>
            </form>
          </div>
          <div className="">
            <Link
              className="flex items-center justify-center gap-3  bg-sky-600 rounded py-3 px-4 text-white "
              href={"/agenda/reservar"}
            >
              <IconCalendarPlus />
              Reservar
            </Link>
          </div>
        </div>
      </div>
      <section>
        <div className="flex flex-col gap-4 ">
          {reservas.length < 0 ? (
            <p>{reservas.length}Nenhum agendamento</p>
          ) : (
            <>
              {reservas?.sort(compare).map((reserva) => (
                <Card reserva={reserva} key={reserva._id} load={loadData} />
              ))}
            </>
          )}
        </div>
      </section>
    </Article>
  );
};

export default Page;
