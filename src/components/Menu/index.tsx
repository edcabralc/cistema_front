import Link from "next/link";
export const Menu = () => {
  return (
    <ul className="w-full p-4 flex flex-col gap-2 text-zinc-500">
      <li className="hover:">
        <Link href={"/agenda"}>Agenda</Link>
      </li>
      <li>
        <Link href={""}>Diagnostico</Link>
      </li>
      <li>
        <Link href={""}>Avaliação</Link>
      </li>
      <li>
        <Link href={""}>Sair</Link>
      </li>
    </ul>
  );
};
