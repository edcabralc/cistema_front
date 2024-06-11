import { useState } from "react";

import { useForm } from "react-hook-form";
import { IconCalendarCheck, IconCalendarMinus } from "@tabler/icons-react";

import { ReserveType, Status } from "@/data/@types/reserve.type";
import { formatDate } from "@/helpers/formatDate";

import { useApi } from "@/data/hooks/useApi";
import { useFetch } from "@/data/hooks/useFetch";

import { Loading } from "@/components/Loading";

interface CardProps {
  reserva: ReserveType;
  reload: () => void;
}

export const Card = ({ reserva, reload }: CardProps) => {
  const [loading, setLoading] = useState<boolean>(false);
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
      reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-10 lg:flex-row items-center border rounded hover:bg-zinc-50">
      <div id="card" className="w-full">
        <div className="flex p-6 bg-gray-100 items-center" id="header">
          <div className=" flex flex-1 gap-1.5">
            <p className="text-zinc-500">Professor:</p>
            <p>{reserva.user.name}</p>
          </div>
          <div className="flex">
            <input
              type="hidden"
              {...register("id")}
              value={reserva.id}
              name="_id"
              id="formUpdate"
            />

            <button
              id="formUpdate"
              className="w-full h-12 flex  justify-center items-center gap-4 py-3 px-6 cursor-pointer border border-gray-400 rounded hover:bg-gray-400 hover:text-white"
              disabled={loading}
              onClick={handleSubmit(handleApprove)}
              type="button"
            >
              <IconCalendarCheck /> Confirmar
            </button>

            <form id="formUpdate" />
          </div>
        </div>
        <div id="container" className="w-full flex flex-col gap-4 p-6">
          <div className="flex gap-8 items-center">
            <div className="flex flex-col">
              <div className="flex gap-2">
                <p className="text-zinc-500">Data:</p>
                <p>{formatDate(reserva.date)}</p>
                <div className="w-full flex-1 flex gap-2">
                  <p className="text-zinc-500">Horário:</p>
                  <h2 className=" text-zinc-600">
                    {reserva.time?.map((hora: string) => ` ${hora}\n `)}
                  </h2>
                </div>
              </div>
              <div className="flex gap-1.5">
                <p className="text-zinc-500">Turma:</p>
                <p>{reserva.classCode}</p>
                <p className="text-zinc-500">Alunos:</p>
                <p className="text-zinc-500">{reserva.students}</p>
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex gap-2">
                <p className="text-zinc-500">Reserva:</p>
                <p>{reserva.book}</p>
              </div>
              <div className="flex gap-2">
                <p
                  className={`w-32 rounded-full p-1.5 text-center text-[12px] font-bold ${
                    reserva.status === "Pendente"
                      ? " bg-red-300"
                      : " bg-green-300"
                  }`}
                >
                  {reserva.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
