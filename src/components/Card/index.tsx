import { useState } from "react";

import { useForm } from "react-hook-form";

import { ReserveType, Status } from "@/data/@types/reserve.type";

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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Content } from "@/components/Card/card-content";

interface CardProps {
  reserva: ReserveType;
  reload: () => void;
}

export const Card = ({ reserva, reload }: CardProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const handleCancel = async (data: ReserveType) => {
    setLoading(true);

    data = {
      ...data,
      status: Status.PENDING,
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
      setMessage("Agendamento cancelado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    reload();
    setMessage(null);
    setIsOpen(false);
  };

  return (
    <>
      <CardRoot>
        <CardHeader className="bg-muted">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
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

        <div className="pt-4">
          <CardContent className="flex flex-col gap-4 md:flex-row">
            <Content
              time={reserva.time}
              classCode={reserva.classCode}
              date={reserva.date}
              students={reserva.students}
            />
          </CardContent>
          <Separator />
          <CardFooter className="py-4">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex flex-col gap-2 md:flex-row md:gap-8">
                <div className="flex gap-2">
                  <p className="font-semibold">Reserva:</p>
                  <p>{reserva.book}</p>
                </div>
                <span>
                  Status: <CardBadge text={reserva.status} />
                </span>
              </div>
              <div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    {reserva.status === "Agendado" ? (
                      <Button variant="outline">Cancelar</Button>
                    ) : (
                      <Button>Aprovar</Button>
                    )}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-xl">
                        Confirmar agendamento
                      </DialogTitle>
                      <DialogDescription>asjafsd</DialogDescription>
                    </DialogHeader>
                    <input
                      type="hidden"
                      {...register("id")}
                      value={reserva.id}
                      name="_id"
                      id="formUpdate"
                    />

                    <form id="formUpdate" />
                    <div>
                      {loading ? (
                        <>
                          <Loading />
                        </>
                      ) : (
                        <>
                          <p>
                            {message ? (
                              message
                            ) : (
                              <>
                                Confirmar o agendamento de {reserva.user.name}{" "}
                                em
                                {reserva.date}
                              </>
                            )}
                          </p>
                        </>
                      )}
                    </div>
                    <Separator />

                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <div className="flex w-full justify-end gap-4">
                          {message ? (
                            <>
                              <Button onClick={handleClose} type="reset">
                                Fechar
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                type="reset"
                                disabled={loading}
                                variant="outline">
                                Cancelar
                              </Button>

                              <Button
                                type="button"
                                onClick={handleSubmit(handleApprove)}
                                disabled={loading}>
                                Aprovar
                              </Button>
                            </>
                          )}
                        </div>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardFooter>
        </div>
      </CardRoot>
    </>
  );
};
