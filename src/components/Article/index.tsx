import { Card } from "@/components/ui/card";

export const Article = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Card className="h-full flex p-6 pr-3 justify-center">
        <div className="w-full flex flex-col overflow-y-scroll">{children}</div>
      </Card>
      {/* <div className="h-full flex m-4 p-6 justify-center bg-white border rounded ">
        <div className="w-full flex flex-col overflow-y-scroll">{children}</div>
      </div> */}
    </>
  );
};
