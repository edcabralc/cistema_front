import Link from "next/link";
import {
  IconLayoutDashboard,
  IconCalendarMonth,
  IconChartHistogram,
  IconLogout,
} from "@tabler/icons-react";
export const Menu = () => {
  return (
    <ul className="grid grid-cols-1 auto-rows-min   text-zinc-500">
      <li className="hover:bg-slate-100 hover:border-r-4 hover:border-r-sky-600">
        <Link href={"/agenda"} className="flex gap-6 p-4">
          <IconLayoutDashboard />
          Inicio
        </Link>
      </li>

      <li className="hover:bg-slate-100 hover:border-r-4 hover:border-r-sky-600">
        <Link href={"/agenda"} className="flex gap-6 p-4">
          <IconCalendarMonth />
          Agenda
        </Link>
      </li>

      <li className="hover:bg-slate-100 hover:border-r-4 hover:border-r-sky-600">
        <Link href={"/"} className="flex gap-6 p-4">
          <IconChartHistogram />
          Diagnostico
        </Link>
      </li>

      <li className="hover:bg-slate-100 hover:border-r-4 hover:border-r-sky-600">
        <Link href={""} className="flex gap-6 p-4">
          <IconLogout />
          Sair
        </Link>
      </li>
    </ul>
  );
};
