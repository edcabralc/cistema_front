import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card } from "../ui/card";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export const Profile = () => {
  return (
    <>
      <Card className="flex gap-4 justify-between items-center p-3">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-bold">Novo Teste</p>
            <p className="text-muted-foreground">Professor</p>
          </div>
        </div>
        <div className="justify-self-end">
          <Button variant="ghost" className="rounded-full" size="icon">
            <Bell />
          </Button>
        </div>
      </Card>
    </>
  );
};
