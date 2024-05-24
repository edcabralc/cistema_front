import { useForm } from "react-hook-form";

import { useFetch } from "@/data/hooks/useFetch";

import { IconCalendarCheck, IconCalendarMinus } from "@tabler/icons-react";

import { ReserveType, Status } from "@/data/@types/reserve.type";
import { formatDate } from "@/helpers/formatDate";
import { revalidatePathAction } from "@/actions/revalidate.path";

import { Loading } from "@/components/Loading";
import { useEffect, useState } from "react";
import { UserType } from "@/data/@types/user.type";

interface CardProps {
  reserva: ReserveType;
  load: () => void;
}

export const Card = ({ reserva, load }: CardProps) => {
  const { register, handleSubmit } = useForm<ReserveType>();
  const { editData, getData } = useFetch();
  const [loading, setLoading] = useState<boolean>(false);

  const [teacher, setTeacher] = useState<UserType | any>([]);

  const handleApprove = async (data: ReserveType) => {
    setLoading(true);
    console.log("data:", data);
    data = {
      ...data,
      status: Status.APPROVED,
    };

    try {
      const response = await editData<ReserveType>(
        `agenda/reserva/atualizar/${data._id}`,
        data
      );

      if (response.status !== 200) {
        throw new Error("Erro ao atualizar");
      }

      await revalidatePathAction("/agenda");
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      load();
    }
  };

  const loadTeacher = async (id: string) => {
    console.log("data:", id);

    try {
      const response = await getData<UserType>(`user/${id}`);

      if (response.status !== 200) {
        throw new Error("Erro ao atualizar");
      }

      setTeacher(response.data);

      await revalidatePathAction("/agenda");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTeacher(reserva.userId);
  }, []);

  return (
    <div className="flex flex-col p-6 gap-4 lg:gap-10 lg:flex-row items-center border rounded hover:bg-zinc-50">
      <div id="card" className="w-full flex flex-2">
        <div className="w-full flex flex-1 lg:justify-center flex-col lg:flex-row items-center gap-4 lg:gap-8 ">
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
            {/* <p>{reserva.userId}</p> */}
            <p>{teacher.name}</p>
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
            <p className="text-zinc-500">Turma:</p>
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
      <div className="w-full flex justify-end flex-1">
        <input
          type="hidden"
          {...register("_id")}
          value={reserva._id}
          name="_id"
          id="formUpdate"
        />
        {reserva.status === "Agendado" ? (
          <button
            disabled={loading}
            id="formUpdate"
            className="w-full h-12 lg:w-40 flex gap-4 justify-center items-center py-3 px-6 cursor-pointer border rounded hover:bg-red-500 hover:text-white"
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                <IconCalendarMinus /> Cancelar
              </>
            )}
          </button>
        ) : (
          <button
            className="w-full h-12 flex lg:w-40 justify-center items-center gap-4 py-3 px-6 cursor-pointer border rounded hover:bg-sky-500 hover:text-white"
            disabled={loading}
            onClick={handleSubmit(handleApprove)}
            type="button"
            id="formUpdate"
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                <IconCalendarCheck /> Confirmar
              </>
            )}
          </button>
        )}
        <form id="formUpdate" />
      </div>
    </div>
  );
};