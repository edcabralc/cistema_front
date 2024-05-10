export const Article = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex p-6 justify-center bg-white border rounded ">
      <div className="container flex flex-col overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};
