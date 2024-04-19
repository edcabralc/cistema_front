import Link from "next/link";
export const Menu = () => {
  return (
    <ul className="w-full p-4 flex flex-col gap-2">
      <li>
        <Link href={"/agenda"}>Agenda</Link>
      </li>
      <li>
        <Link href={"/diagnostico"}>Diagnostico</Link>
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
