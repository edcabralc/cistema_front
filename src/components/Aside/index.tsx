import { Calendar } from "@/components/ui/calendar";
import { Profile } from "../Profile";

export const Aside = () => {
  return (
    <div className="h-full flex p-6 justify-center bg-white border rounded ">
      <div className="w-full flex flex-col">
        <div>
          <Profile />
        </div>
        <Calendar className="p-0 mt-4"></Calendar>
      </div>
    </div>
  );
};
