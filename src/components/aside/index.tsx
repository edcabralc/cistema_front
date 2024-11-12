import { Calendar } from "@/components/ui/calendar";
import { Profile } from "@/components/profile";

export const Aside = () => {
  return (
    <aside className="flex h-full justify-center rounded border bg-white p-4">
      <div className="flex w-full flex-col">
        <Profile />
        <Calendar className="mt-4 p-0" />
      </div>
    </aside>
  );
};
