import { Calendar } from "@/components/ui/calendar";
import { Profile } from "@/components/Profile";

export const Aside = () => {
  return (
    <div className="h-full flex p-4 justify-center bg-white border rounded ">
      <div className="w-full flex flex-col">
        <Profile />
        <Calendar className="p-0 mt-4" />
      </div>
    </div>
  );
};
