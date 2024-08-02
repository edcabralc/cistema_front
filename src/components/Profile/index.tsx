import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Bell } from "lucide-react";

export const Profile = () => {
  return (
    <Card className="flex items-center justify-between gap-4 p-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold">Novo Teste</p>
          <p className="text-muted-foreground">Professor</p>
        </div>
      </div>
      <Button variant="ghost" className="rounded-full" size="icon">
        <Bell />
      </Button>
    </Card>
  );
};
