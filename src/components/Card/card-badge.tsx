import { Badge } from "@/components/ui/badge";
import { ReactElement } from "react";

type CardBadgeProps = {
  text: string;
};

export const CardBadge = ({ text }: CardBadgeProps) => {
  return (
    <Badge
      className={`font-bold text-current hover:bg-transparent ${
        text === "Pendente"
          ? " bg-rose-100 border-rose-500"
          : " bg-teal-100 border-teal-500"
      }`}
    >
      {text}
    </Badge>
  );
};
