"use server";

import { useFetch } from "@/data/hooks/useFetch";
import { useApi } from "@/data/hooks/useApi";

import { ReserveType } from "@/data/@types/reserve.type";

import { revalidatePath } from "next/cache";
import { api } from "@/data/services/api";
import { redirect } from "next/dist/server/api-utils";

export const revalidatePathAction = async (path: string) => {
  revalidatePath(path);
};

export const getUsersTest = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log("sera isso:", data);
  return data;
};

export const getAgendaTest = async () => {
  const response = await fetch("http://localhost:3003/agenda");
  const data = await response.json();
  console.log("sera isso:", data);
  return data;
};

export const getAgendaTestAPI = async () => {
  // const reservas = useFetch<ReserveType[]>("/agenda");
  // const { getData } = useApi();
  const response = await fetch("http://localhost:3003/agenda");
  const data = await response.json();
  console.log("sera isso:", data);
  return data;
};

export const PostDataTest = async (endpoint: any, payload: any) => {
  try {
    const response: any = await api.post(endpoint, payload, {
      withCredentials: true,
    });

    revalidatePath("/");
    return response;
  } catch (error) {
    throw error;
  }
};
