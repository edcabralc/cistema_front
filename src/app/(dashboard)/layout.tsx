"use client";

import { Menu } from "@/components/Menu";
import Image from "next/image";
import { useState } from "react";
import { IconMenu } from "@tabler/icons-react";
import { Aside } from "@/components/Aside";
import { Logo } from "@/components/Logo";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <main className="flex h-screen">
      <>
        <div className={`${open ? "w-1/5" : "w-20"} border-r`}>
          <span
            className="left-10 flex justify-center p-5"
            onClick={() => setOpen(!open)}>
            <IconMenu stroke={2} />
          </span>
          <aside className="relative flex w-full flex-col">
            <Logo />
            <Menu open={open} />
          </aside>
        </div>
      </>

      <div className="h-screen w-full bg-neutral-50">
        <article className="h-[95%] p-6">
          <nav className="col-span-10 col-start-3 bg-neutral-50 px-6 pb-4">
            nav
          </nav>
          {children}
        </article>
      </div>
      <Aside />
    </main>
  );
};

export default DashboardLayout;
