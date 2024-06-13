import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { IconCalendarCheck, IconCalendarMinus } from "@tabler/icons-react";

import { useForm } from "react-hook-form";

import { ReserveType, Status } from "@/data/@types/reserve.type";
import { formatDate } from "@/helpers/formatDate";

import { useApi } from "@/data/hooks/useApi";
import { useFetch } from "@/data/hooks/useFetch";

import { Loading } from "@/components/Loading";

import {
  Card as CardRoot,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CardBadge } from "./card-badge";
import { CardAvatar } from "./card-avatar";

import { CardAction } from "./card-actions";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

interface CardProps {
  reserva: ReserveType;
  reload: () => void;
}

export const Card = ({ reserva, reload }: CardProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<ReserveType>();
  const { editData } = useApi();

  const handleApprove = async (data: ReserveType) => {
    setLoading(true);

    data = {
      ...data,
      status: Status.APPROVED,
    };

    try {
      const response = await editData<ReserveType>(
        `agenda/reserva/atualizar/${data.id}`,
        data
      );

      if (response.status !== 200) {
        throw new Error("Não foi possível agendar. Erro inesperado");
      }

      console.log(response);
      setLoading(false);
      setMessage("Agendamento confirmado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    reload();
  };

  return (
    <>
      <CardRoot>
        <CardHeader className="bg-muted">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <CardAvatar />
                <div className="flex flex-col">
                  <CardTitle className="text-base font-bold">
                    {reserva.user.name}
                  </CardTitle>
                  <CardDescription>
                    <p>Professor</p>
                  </CardDescription>
                </div>
              </div>
            </div>
            <CardAction />
          </div>
        </CardHeader>
        {/* <Separator /> */}
        <div className="pt-4">
          <CardContent className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col gap-1 ">
                <p className="font-semibold">Data do agendamento:</p>
                <p>{formatDate(reserva.date)}</p>
              </div>
              <div className="flex flex-col gap-1 ">
                <p className="font-semibold">Horários:</p>
                <p>{reserva.time?.map((hora: string) => ` ${hora}\n `)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col gap-1 ">
                <p className="font-semibold">Turma:</p>
                <p>{reserva.classCode}</p>
              </div>
              <div className="flex flex-col gap-1 ">
                <p className="font-semibold">Alunos:</p>
                <p>{reserva.students}</p>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="py-4">
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-8">
                <div className="flex gap-2">
                  <p className="font-semibold">Reserva:</p>
                  <p>{reserva.book}</p>
                </div>
                <p>
                  Status: <CardBadge text={reserva.status} />
                </p>
              </div>
              <div>
                {reserva.status === "Agendado" ? (
                  <Button>Aprovar</Button>
                ) : (
                  <Button variant="outline"> Cancelar</Button>
                )}
              </div>
            </div>
          </CardFooter>
        </div>
      </CardRoot>

      {/* isso vai pro lixo */}

      <div className="flex flex-col gap-4 lg:gap-10 lg:flex-row items-center border border-gray-300 rounded hover:bg-zinc-50">
        <div id="card" className="w-full">
          <div className="flex p-6 bg-gray-200 items-center" id="header">
            <div className="flex">
              {reserva.status !== "Agendado" ? (
                <>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button className="w-full h-12 flex justify-center items-center gap-4 py-3 px-6 cursor-pointer border border-gray-400 rounded hover:bg-sky-900 hover:text-white">
                        <IconCalendarCheck /> Confirmar
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0">
                        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                          <input
                            type="hidden"
                            {...register("id")}
                            value={reserva.id}
                            name="_id"
                            id="formUpdate"
                          />

                          <form id="formUpdate" />

                          <div className="flex flex-col">
                            <h3 className="font-bold text-xl pb-4">
                              Aprovar agendamento
                            </h3>
                            <hr />
                            {loading ? (
                              <p className="py-4">Carregando...</p>
                            ) : (
                              <div>
                                {message ? (
                                  <div className="flex flex-col">
                                    <p className="py-4">{message}</p>
                                    <div className="flex justify-end">
                                      <Dialog.Close asChild>
                                        <button
                                          className="h-12 flex justify-center items-center gap-4 py-3 px-6 cursor-pointer border border-sky-900 rounded hover:bg-sky-900 hover:text-white"
                                          type="button"
                                          onClick={handleClose}
                                        >
                                          Fechar
                                        </button>
                                      </Dialog.Close>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div>
                                      <div className="py-4">
                                        <p>
                                          Confirmar o agendamento de{" "}
                                          {reserva.user.name} em {reserva.date}?
                                        </p>
                                      </div>
                                      <div className="flex gap-4 justify-end">
                                        <Dialog.Close asChild>
                                          <button
                                            className="h-12 flex justify-center items-center gap-4 py-3 px-6 cursor-pointer border border-rose-900 rounded hover:bg-rose-900 hover:text-white"
                                            data-
                                            type="reset"
                                          >
                                            Cancelar
                                          </button>
                                        </Dialog.Close>
                                        <button
                                          className={`h-12 flex justify-center items-center gap-4 py-3 px-6 cursor-pointer border border-sky-900 rounded hover:bg-sky-900 hover:text-white ${
                                            loading ? "animate-pulse" : ""
                                          } `}
                                          onClick={handleSubmit(handleApprove)}
                                          disabled={loading}
                                          type="button"
                                        >
                                          Aprovar
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </Dialog.Content>
                      </Dialog.Overlay>
                    </Dialog.Portal>
                  </Dialog.Root>
                </>
              ) : (
                "..."
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
