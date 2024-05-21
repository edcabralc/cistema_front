import { useForm } from "react-hook-form";

import { useFetch } from "@/data/hooks/useFetch";

import { IconCalendarCheck, IconCalendarMinus } from "@tabler/icons-react";

import { ReserveType, Status } from "@/data/@types/reserve.type";
import { formatDate } from "@/helpers/formatDate";

export const Card: React.FC<{ reserva: ReserveType }> = ({ reserva }) => {
  const { register, handleSubmit } = useForm<ReserveType>();
  const { editData } = useFetch();

  const handleApprove = async (data: ReserveType) => {
    console.log("data:", data);
    data = {
      ...data,
      status: Status.APPROVED,
    };

    try {
      const response = await editData(
        `agenda/reserva/atualizar/${data._id}`,
        data
      );

      // if (response.status !== 200) {
      //   throw new Error("Erro ao atualizar");
      // }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-6 gap-4 lg:gap-10 lg:flex-row items-center border rounded hover:bg-zinc-50">
      <div id="card" className="flex w-full">
        <div className="w-full flex lg:justify-center flex-col lg:flex-row items-center gap-4 lg:gap-8 ">
          <div className="w-full flex flex-col gap-2">
            <p className="text-zinc-500">Agendamento:</p>
            <h2 className="text-lg font-bold text-zinc-600">
              {formatDate(reserva.date)}
            </h2>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="text-zinc-500">Horário:</p>
            <h2 className="text-lg font-bold text-zinc-600">
              {reserva.time?.map((hora: string) => hora)}
            </h2>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="text-zinc-500">Professor</p>
            <p>{reserva.userId}</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="text-zinc-500">Reserva:</p>
            <p>{reserva.book}</p>
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
            <p className="text-zinc-500">Status</p>
            <p
              className={
                reserva.status === "Pendente"
                  ? "w-20 bg-red-300 rounded p-1.5 text-center text-[12px] font-bold"
                  : "w-20 bg-green-300 rounded p-1.5 text-center text-[12px] font-bold"
              }
            >
              {reserva.status}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex-1 flex gap-4">
        <form className="w-full">
          <input
            type="hidden"
            {...register("_id")}
            value={reserva._id}
            name="_id"
          />
          {reserva.status === "Agendado" ? (
            <>
              <button className="w-full flex gap-4 py-3 justify-center px-6 cursor-pointer border rounded hover:bg-red-500 hover:text-white">
                <IconCalendarMinus />
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full flex justify-center gap-4 py-3 px-6 cursor-pointer border rounded hover:bg-sky-500 hover:text-white"
                onClick={handleSubmit(handleApprove)}
                type="button"
              >
                <IconCalendarCheck />
                Confirmar
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
