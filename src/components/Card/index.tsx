"use client";
import { Content } from "@/components/Card/card-content";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Card as CardRoot,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReserveType, Status } from "@/data/@types/reserve.type";
import { useApi } from "@/data/hooks/useApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CardAction } from "./card-actions";
import { CardAvatar } from "./card-avatar";
import { CardBadge } from "./card-badge";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface CardProps {
  reserve: ReserveType;
}

export const Card = ({ reserve }: CardProps) => {
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
        data,
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
        data,
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
                    {/* {reserve?.user.name} */}
                    {reserve.user.id}
                  </CardTitle>
                  <CardDescription>
                    {reserve.user.id} {/* {reserve?.user.name} */}
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
              time={reserve.time}
              classCode={reserve.classCode}
              date={reserve.date}
              students={reserve.students}
            />
          </CardContent>
          <Separator />
          <CardFooter className="py-4">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex flex-col gap-2 md:flex-row md:gap-8">
                <div className="flex gap-2">
                  <p className="font-semibold">Reserva:</p>
                  <p>{reserve.book}</p>
                </div>
                <span>
                  Status: <CardBadge text={reserve.status} />
                </span>
              </div>
              <div>
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                  <AlertDialogTrigger asChild>
                    {reserve.status === "Agendado" ? (
                      <Button variant="outline">Cancelar</Button>
                    ) : (
                      <Button>Aprovar</Button>
                    )}
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl">
                        Confirmar agendamento
                      </AlertDialogTitle>
                      <AlertDialogDescription>asjafsd</AlertDialogDescription>
                    </AlertDialogHeader>
                    <input
                      type="hidden"
                      {...register("id")}
                      value={reserve.id}
                      name="_id"
                      id="formUpdate"
                    />

                    <form id="formUpdate" />
                    <div>
                      {loading ? (
                        <Loading />
                      ) : (
                        <p>
                          {message ? (
                            message
                          ) : (
                            <>
                              {`Confirmar o agendamento de ${"reserve.user.name"} 
                                em ${reserve.date}`}
                            </>
                          )}
                        </p>
                      )}
                    </div>
                    <Separator />

                    <AlertDialogFooter className="sm:justify-start">
                      <>
                        <AlertDialogCancel onClick={handleClose}>
                          Fechar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleSubmit(handleApprove)}
                        >
                          Aprovar
                        </AlertDialogAction>
                      </>
                      {/* {message ? (
                        <>
                          <AlertDialogCancel onClick={handleClose}>
                            Fechar
                          </AlertDialogCancel>
                        </>
                      ) : (
                        <>
                          <Button
                            type="reset"
                            disabled={loading}
                            variant="outline"
                          >
                            Cancelar
                          </Button>

                          <Button
                            type="button"
                            onClick={handleSubmit(handleApprove)}
                            disabled={loading}
                          >
                            Aprovar
                          </Button>
                        </>
                      )} */}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardFooter>
        </div>
      </CardRoot>
    </>
  );
};
