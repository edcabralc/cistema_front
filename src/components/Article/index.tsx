export const Article = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="size-full flex p-6 justify-center bg-white border rounded">
      <div className="container flex flex-col">{children}</div>
    </div>
  );
};
