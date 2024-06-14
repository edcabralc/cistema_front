"use client";

import Link from "next/link";
import { IconCalendarPlus } from "@tabler/icons-react";

import { useFetch } from "@/data/hooks/useFetch";
import { useApi } from "@/data/hooks/useApi";

import { ReserveType } from "@/data/@types/reserve.type";

import { Article } from "@/components/Article";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loading } from "@/components/Loading";

const Page = () => {
  const reservas = useFetch<ReserveType[]>("/agenda");
  const { getData } = useApi();

  const loadData = async () => {
    try {
      const response = await getData<ReserveType[]>("/agenda");

      if (response.status !== 200) {
        throw new Error("Erro ao carregar os dados");
      }

      return reservas;
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   loadData();
  // }, []);

  const compare = (a: any, b: any) => {
    if (typeof a.date === "string" && typeof b.date === "string") {
      const dateA = new Date(a.date.replace(/-/g, "/"));
      const dateB = new Date(b.date.replace(/-/g, "/"));
      return dateB.getTime() - dateA.getTime();
    }
  };

  return (
    <Article>
      <div className="mb-8 mt-1 flex flex-col items-center justify-between gap-8 border-b pb-4 lg:flex-row">
        <h1 className="flex-1 text-2xl font-bold">AGENDAMENTO IDIOMAS</h1>
        <div className="flex w-full flex-1 items-center gap-4 lg:justify-end">
          <div className="">
            <form action="max-w-sm mx-auto">
              <Select>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Hoje" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Hoje</SelectItem>
                  <SelectItem value="dark">Semana</SelectItem>
                  <SelectItem value="system">Mês</SelectItem>
                </SelectContent>
              </Select>
            </form>
          </div>
          <div className="">
            <Button asChild>
              <Link
                className="flex items-center justify-center gap-3"
                href={"/agenda/reservar"}>
                <IconCalendarPlus />
                Reservar
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <section>
        <div className="flex flex-col gap-4">
          {reservas.data?.length === 0 ? (
            <p>Nenhum agendamento</p>
          ) : (
            <>
              {reservas.loading ? (
                <Loading />
              ) : (
                <>
                  {/* {reservas.data?.sort(compare).map((reserva: ReserveType) => ( */}
                  {reservas.data?.map((reserva: ReserveType) => (
                    <Card
                      reserva={reserva}
                      key={reserva.id}
                      reload={reservas.reload}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </Article>
  );
};

export default Page;
