type HeaderType = {
  children: JSX.Element;
  title: string;
};

export const Header = ({ children, title }: HeaderType) => {
  return (
    <div className="pb-4 mb-8 flex items-center justify-between border-b">
      <h1 className="font-bold text-2xl">{title}</h1>
      {children}
    </div>
  );
};
