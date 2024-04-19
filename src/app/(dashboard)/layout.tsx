import { Menu } from "@/components/Menu";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid grid-cols-12">
      <aside className="bg-slate-300 flex justify-center w-full col-span-2">
        <Menu />
      </aside>
      <article className="col-span-8">{children}</article>
    </main>
  );
};

export default DashboardLayout;
