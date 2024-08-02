"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IconLayoutDashboard,
  IconCalendarMonth,
  IconChartHistogram,
  IconLogout,
} from "@tabler/icons-react";
import { IconLayoutSidebarRightExpand } from "@tabler/icons-react";
import { Logo } from "../Logo";

export const Menu = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className={`${open ? "w-full" : "w-1/5"}`}>
      {open ? (
        <span className="flex gap-4">
          <Logo />
        </span>
      ) : (
        <Logo />
      )}
      <menu className="flex flex-col gap-4">
        <li className="py-4 px-6">
          <Link href={"/"}>
            {open ? (
              <span className="flex gap-4">
                <IconLayoutDashboard className="col-auto" />
                <p className="">Inicio</p>
              </span>
            ) : (
              <IconLayoutDashboard className="col-auto" />
            )}
          </Link>
        </li>
        <li className="py-4 px-6">
          <Link href={"/agenda"}>
            {open ? (
              <span className="flex gap-4">
                <IconCalendarMonth />
                <p className="">Agenda</p>
              </span>
            ) : (
              <IconCalendarMonth />
            )}
          </Link>
        </li>
        <li className="py-4 px-6">
          <Link href={"/diagnostico"}>
            {open ? (
              <span className="flex gap-4">
                <IconChartHistogram />
                <p className="">Diagnostico</p>
              </span>
            ) : (
              <IconChartHistogram />
            )}
          </Link>
        </li>
        <li className="py-4 px-6">
          <Link href={"/sair"}>
            {open ? (
              <span className="flex gap-4">
                <IconLogout />
                <p className="">Sair</p>
              </span>
            ) : (
              <IconLogout />
            )}
          </Link>
        </li>
        <li className="py-4 px-6">
          <span className="" onClick={() => setOpen((open) => !open)}>
            <IconLayoutSidebarRightExpand stroke={2} />
          </span>
        </li>
      </menu>
    </div>
  );
};
