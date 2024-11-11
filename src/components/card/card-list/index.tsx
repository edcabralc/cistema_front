import { Suspense } from "react";

import { Card } from "@/components/card";

import { useApi } from "@/data/hooks/useApi";

import { ReserveType } from "@/data/@types/reserve.type";

export const CardList = async () => {
  const { getData } = useApi();

  const reservesFetched = await getData("/agenda");
  const reserves = reservesFetched.data as ReserveType[];

  return (
    <>
      <Suspense fallback={<div>Carregando...o suspense</div>}>
        {reserves?.map(reserve => <Card reserve={reserve} key={reserve.id} />)}
      </Suspense>
    </>
  );
};
