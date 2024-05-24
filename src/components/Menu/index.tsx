import Link from "next/link";
import {
  IconLayoutDashboard,
  IconCalendarMonth,
  IconChartHistogram,
  IconLogout,
} from "@tabler/icons-react";
export const Menu = ({ open }: any) => {
  return (
    <div className="w-full">
      <menu className="flex flex-col gap-4">
        <li className="py-4 px-6">
          <Link href={"/"} className="flex gap-4">
            <IconLayoutDashboard className="col-auto" />
            {open ? <p className="">Inicio</p> : ""}
          </Link>
        </li>
        <li className="py-4 px-6">
          <Link href={"/agenda"} className="flex gap-4">
            <IconCalendarMonth />
            {open ? <p className="">Agenda</p> : ""}
          </Link>
        </li>
        <li className="py-4 px-6">
          <Link href={"/diagnostico"} className="flex gap-4">
            <IconChartHistogram />
            {open ? <p className="">Diagnostico</p> : ""}
          </Link>
        </li>
        <li className="py-4 px-6">
          <Link href={"/sair"} className="flex gap-4">
            <IconLogout />
            {open ? <p className="">Sair</p> : ""}
          </Link>
        </li>
      </menu>
    </div>
  );
};
