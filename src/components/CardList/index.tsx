"use client";
import { useAgenda } from "@/data/contexts/agenda.context";
import { Card } from "../Card";

import { ReserveType } from "@/data/@types/reserve.type";

import { useApi } from "@/data/hooks/useApi";
import { Suspense, useEffect, useState } from "react";
import React from "react";
// const Card = React.lazy(() => import("../Card"));

export const CardList = () => {
  const [loading, setLoading] = useState(false);
  const agendaCtx = useAgenda();
  const { getData } = useApi();

  const loadReserves = async () => {
    setLoading(true);
    try {
      const response = await getData<ReserveType>("/agenda");

      if (response.status !== 200) {
        throw new Error("Erro ao carregar os dados");
      }

      const data = response.data;
      console.log(data);

      agendaCtx?.loadReserves(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadReserves();
  }, []);

  return (
    <>
      {loading && <p>Carregando...</p>}
      <Suspense fallback={<div>Carregando...o suspense</div>}>
        {!loading &&
          agendaCtx?.reserves.map((item) => (
            <Card reserve={item} key={item.id} />
          ))}
      </Suspense>
    </>
  );
};
