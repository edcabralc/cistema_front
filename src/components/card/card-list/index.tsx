import { Suspense } from "react";

import { Card } from "@/components/card";

import { useApi } from "@/hooks/use-api";

import { ReserveType } from "@/types/reserve.type";

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
