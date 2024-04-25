import { Menu } from "@/components/Menu";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid grid-cols-12 overflow-hidden">
      <nav className="bg-neutral-50 col-start-3 col-span-10 py-4 px-6">nav</nav>
      <aside className="w-full border-r flex flex-col col-span-2 row-span-3  col-start-1 row-start-1">
        <div className="p-6 self-center">
          <Image src={"/logo_cistema.webp"} width={200} height={50} alt="" />
        </div>
        <Menu />
      </aside>
      <article className="col-span-10 h-screen bg-neutral-50 p-6 overflow-y-hidden">
        {children}
      </article>
    </main>
  );
};

export default DashboardLayout;
