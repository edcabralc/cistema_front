import { CardList } from "@/components/CardList";
import { Suspense } from "react";

const Agenda = () => {
  // const [loading, setLoading] = useState(false);
  // const agendaCtx = useAgenda();
  // const { getData } = useApi();

  // console.log(agendaCtx?.reserves);

  // const compare = (a: any, b: any) => {
  //   if (typeof a.date === "string" && typeof b.date === "string") {
  //     const dateA = new Date(a.date.replace(/-/g, "/"));
  //     const dateB = new Date(b.date.replace(/-/g, "/"));
  //     return dateB.getTime() - dateA.getTime();
  //   }
  // };

  // const loadReserves = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getData<ReserveType>("/agenda");

  //     if (response.status !== 200) {
  //       throw new Error("Erro ao carregar os dados");
  //     }

  //     const data = response.data;
  //     console.log(data);

  //     agendaCtx?.loadReserves(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   loadReserves();
  // }, []);

  return (
    <section>
      <div className="flex flex-col gap-4">
        {/* {!loading && agendaCtx?.reserves?.length === 0 ? (
        <p>Nenhum agendamento</p>
      ) : (
        <> */}
        {/* <Suspense fallback={<div>Carregando...</div>}>
            {agendaCtx?.reserves?.map((reserve: ReserveType) => (
              <Card reserve={reserve} key={reserve.id} />
            ))}
          </Suspense> */}
        <Suspense fallback={<p>Suspense...</p>}>
          <CardList />
        </Suspense>
        {/* </>
      )} */}
      </div>
    </section>
  );
};

export { Agenda };

{
  /* <>
  {loading ? (
    <Loading />
  ) : (
    <>
      
      <Suspense fallback={<div>Carregando...</div>}>
        {agendaCtx?.reserves?.map((reserve: ReserveType) => (
          <Card reserve={reserve} key={reserve.id} />
        ))}
      </Suspense>
    </>
  )}
</>; */
}
