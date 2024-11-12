"use server";
// type ReserveReducerType =
//   | AddReserve
//   | RemoveReserve
//   | EditReserve
//   | LoadReserve;

import { useApi } from "@/hooks/use-api";
import { ReserveType } from "@/types/reserve.type";
import { revalidatePath } from "next/cache";

const addReserve = async (reserve: ReserveType) => {
  const { postData } = useApi();
  try {
    const response = await postData<ReserveType>(
      "agenda/reservar/6661ae2a4aeef1073b41b70d",
      reserve
    );

    if (response.status !== 200) {
      throw new Error("Erro ao cadastrar agendamento");
    }

    revalidatePath("/agenda");
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export { addReserve };
