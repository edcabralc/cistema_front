"use client";

import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";
import { IconCalendarPlus } from "@tabler/icons-react";

type ModalType = {
  title: string;
  titleButton: string;
  description: string;
  children: ReactNode;
};

export const Modal = ({
  title,
  titleButton,
  description,
  children,
}: ModalType) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button asChild>
          <div className="flex items-center justify-center gap-3">
            <IconCalendarPlus />
            {/* Reservar */}
            {titleButton}
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-max h-max">
        <DialogHeader>
          <DialogTitle>
            {/* Agendamento */}
            {title}
          </DialogTitle>
          <DialogDescription>
            {/* Agende laboratório ou equipamentos. */}
            {description}
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-2" />
        {children}
        {/* <ReservaModal setOpen={setOpen} /> */}
      </DialogContent>
    </Dialog>
  );
};
