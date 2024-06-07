import { useState } from "react";

export const useShifts = () => {
  const [shifts, setShifts] = useState<string | null>(null);

  const timeShifts: any = {
    manha: ["07:30", "09:30"],
    tarde: ["13:00", "15:00"],
    noite: ["18:00", "20:00"],
    sabado: ["08:00", "10:00"],
  };

  const setTimeShifts = (time: string): string[] => timeShifts[time];

  console.log(setTimeShifts("tarde"));

  return { shifts, setShifts, setTimeShifts };
};
