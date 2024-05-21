"use client";
import { useEffect, useState } from "react";
import { IconCalendarPlus } from "@tabler/icons-react";
import Link from "next/link";

import { useFetch } from "@/data/hooks/useFetch";

import { ReserveType, Status } from "@/data/@types/reserve.type";

import { Article } from "@/components/Article";
import { Card } from "@/components/Card";

const Page = () => {
  const { getData, editData } = useFetch();
  const [reservas, setReservas] = useState<ReserveType[]>([]);

  const loadData = async () => {
    try {
      const response = await getData<ReserveType>("agenda");
      console.log(response);
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
          {!reservas && <p>Nenhum agendamento</p>}
          {reservas?.map((reserva, index) => (
            <Card reserva={reserva} />
            // <div className="flex flex-col p-6 gap-4 lg:gap-10 lg:flex-row items-center border rounded hover:bg-zinc-50">
            //   <div key={index} id="card" className="flex w-full">
            //     <div className="w-full flex lg:justify-center flex-col lg:flex-row items-center gap-4 lg:gap-8 ">
            //       <div>{reserva._id}</div>
            //       <div className="w-full flex flex-col gap-2">
            //         <p className="text-zinc-500">Agendamento:</p>
            //         <h2 className="text-lg font-bold text-zinc-600">
            //           {reserva.date.toLocaleString()}
            //         </h2>
            //       </div>
            //       <div className="w-full flex flex-col gap-2">
            //         <p className="text-zinc-500">Horário:</p>
            //         <h2 className="text-lg font-bold text-zinc-600">
            //           {reserva.time.map((hora) => hora)}
            //         </h2>
            //       </div>
            //       <div className="w-full flex flex-col gap-2">
            //         <p className="text-zinc-500">Professor</p>
            //         <p>{reserva.userId}</p>
            //       </div>
            //       <div className="w-full flex flex-col gap-2">
            //         <p className="text-zinc-500">Reserva:</p>
            //         <p>{reserva.book}</p>
            //       </div>
            //       <div className="w-full flex flex-col gap-2">
            //         <p className="text-zinc-500">Quantidade:</p>
            //         <p>{reserva.students} alunos</p>
            //       </div>
            //       <div className="w-full flex flex-col gap-2">
            //         <p className="text-zinc-500">Código:</p>
            //         <p>{reserva.classCode}</p>
            //       </div>

            //       <div className="w-full flex flex-col gap-2">
            //         <p className="text-zinc-500">Status</p>
            //         <p
            //           className={
            //             reserva.status === "Pendente"
            //               ? "w-20 bg-red-300 rounded p-1.5 text-center text-[12px] font-bold"
            //               : "w-20 bg-green-300 rounded p-1.5 text-center text-[12px] font-bold"
            //           }
            //         >
            //           {reserva.status}
            //         </p>
            //       </div>
            //     </div>
            //   </div>
            //   <div className="w-full flex-1 flex gap-4">
            //     <form className="w-full">
            //       <input
            //         type="text"
            //         {...register("_id")}
            //         value={reserva._id}
            //         name="_id"
            //       />
            //       {reserva.status === "Agendado" ? (
            //         <>
            //           <button className="w-full flex gap-4 py-3 justify-center px-6 cursor-pointer border rounded hover:bg-red-500 hover:text-white">
            //             <IconCalendarMinus />
            //             Cancelar
            //           </button>
            //         </>
            //       ) : (
            //         <>
            //           <button
            //             className="w-full flex justify-center gap-4 py-3 px-6 cursor-pointer border rounded hover:bg-sky-500 hover:text-white"
            //             onSubmit={handleSubmit(handleApprove)}
            //           >
            //             <IconCalendarCheck />
            //             Confirmar
            //           </button>
            //         </>
            //       )}
            //     </form>
            //   </div>
            // </div>
          ))}
        </div>
      </section>
    </Article>
  );
};

export default Page;
