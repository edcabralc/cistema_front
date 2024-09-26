import Image from "next/image";
import { getUsersTest, getAgendaTest } from "@/actions/revalidate.path";

export default async function Home() {
  const users: any = await getUsersTest();
  const agendas: any = await getAgendaTest();
  console.log(users);

  return (
    <main className="flex min-h-screen flex-col justify-center p-24">
      <h2>teste jsonplace</h2>
      {users?.map((user: any) => (
        <div>
          <p>Nome: {user.name}</p>
        </div>
      ))}

      <h2 className="py-5">teste agenda</h2>
      <p>Quantidade de agendamentos: {agendas.length}</p>
      {agendas?.map((agenda: any) => (
        <div>
          <p>Agenda: {agenda.book}</p>
        </div>
      ))}
    </main>
  );
}
