import { Menu } from "@/components/menu";
import Image from "next/image";

import { Aside } from "@/components/aside";
import { Logo } from "@/components/logo";
import { MenuMobile } from "@/components/menu/menu-mobile";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen flex-col md:flex-row">
      <div className="border-r">
        <aside className="flex w-full flex-row md:flex-col">
          <div className="hidden w-full flex-col md:flex">
            <Menu />
          </div>
          <div className="flex w-full items-center justify-between md:hidden">
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
