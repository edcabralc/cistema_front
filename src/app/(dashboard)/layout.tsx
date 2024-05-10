import { Menu } from "@/components/Menu";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen ">
      <div className="w-1/5 border-r">
        <aside className="w-full flex flex-col">
          <div className="p-6 self-center">
            <Image src={"/logo_cistema.webp"} width={200} height={50} alt="" />
          </div>
          <Menu />
        </aside>
      </div>
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
