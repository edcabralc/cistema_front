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
import { Header } from "@/components/Header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReservaModal } from "@/components/ReservaModal";
import { Separator } from "@/components/ui/separator";

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
      <Header title="Agenda Laboratório">
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

          <Dialog>
            <DialogTrigger>
              <Button asChild>
                <div className="flex items-center justify-center gap-3">
                  <IconCalendarPlus />
                  Reservar
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-max h-max">
              <DialogHeader>
                <DialogTitle>Agendamento</DialogTitle>
                <DialogDescription>
                  Agende laboratório ou equipamentos.
                </DialogDescription>
              </DialogHeader>
              <Separator className="mt-2" />
              <ReservaModal />
              {/* <ReservaFormal /> */}
            </DialogContent>
          </Dialog>
        </div>
      </Header>

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
