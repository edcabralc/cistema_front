"use client";

import { Menu } from "@/components/Menu";
import Image from "next/image";
import { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  console.log(open);

  return (
    <main className="flex h-screen ">
      <span className="absolute left-72" onClick={() => setOpen(!open)}>
        menu
      </span>

      <>
        <div className={open ? "w-1/5 border-r" : "w-20 border-r"}>
          <aside className="w-full flex flex-col">
            <div className="p-6 self-center">
              <Image
                src={"/logo_cistema.webp"}
                width={200}
                height={50}
                alt=""
              />
            </div>
            <Menu open={open} />
          </aside>
        </div>
      </>

      <div className="w-full h-screen bg-neutral-50 ">
        <article className="h-[95%] p-6">
          <nav className="bg-neutral-50 col-start-3 col-span-10 pb-4 px-6">
            nav
          </nav>
          {children}
        </article>
      </div>
    </main>
  );
};

export default DashboardLayout;
