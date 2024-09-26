import { Menu } from "@/components/Menu";
import Image from "next/image";

import { Aside } from "@/components/Aside";
import { Logo } from "@/components/Logo";
import { MenuMobile } from "@/components/Menu/menu-mobile";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col h-screen md:flex-row">
      <div className="border-r">
        <aside className="flex flex-row w-full md:flex-col">
          <div className="w-full flex-col hidden md:flex">
            <Menu />
          </div>
          <div className="w-full justify-between items-center flex md:hidden">
            <Logo />
            <MenuMobile />
          </div>
        </aside>
      </div>

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
