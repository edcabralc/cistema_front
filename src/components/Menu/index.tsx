import Link from "next/link";
import {
  IconLayoutDashboard,
  IconCalendarMonth,
  IconChartHistogram,
  IconLogout,
} from "@tabler/icons-react";
export const Menu = () => {
  return (
    <div className="grid grid-cols-[minmax(50px,_1fr)] bg-blue-500 w-full">
      {/* <ul className="grid grid-cols-2 auto-cols-[200px]   text-zinc-500 bg-red"> */}
      <div className="col-start-1 flex items-center justify-center fixed ">
        <IconLayoutDashboard className="items-center col-start-1 bg-yellow-300" />
      </div>
      <div className="col-start-2">
        <Link href={"/agenda"} className="">
          <p className="bg-rose-900">Inicio</p>
        </Link>
      </div>
      {/* <Link href={"/agenda"} className="flex gap-6 p-4"> */}
      {/* <IconLayoutDashboard className="col-start-1 bg-yellow-300" /> */}
      {/* <p className="col-start-3">Inicio</p> */}
      {/* </Link> */}

      {/* <li className="hover:bg-slate-100 hover:border-r-4 hover:border-r-sky-600">
        <Link href={"/agenda"} className="flex gap-6 p-4">
        <IconLayoutDashboard className="col-start-1" />
        <p className="col-start-3">Inicio</p>
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
      </li> */}
      {/* </ul> */}
    </div>
  );
};
