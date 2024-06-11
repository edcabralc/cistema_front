export const Aside = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex p-6 justify-center bg-white border rounded ">
      <div className="w-full flex flex-col overflow-y-scroll">{children}</div>
    </div>
  );
};
