import { Agenda } from "@/components/Agenda";
import { Article } from "@/components/Article";
import { Header } from "@/components/Header";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Main } from "@/components/Main";
import { Modal } from "@/components/Modal";
import { ReservaForm } from "@/components/ReservaForm";

const Page = () => {
  return (
    <Main>
      <Article>
        <Header title="Agenda Laboratório">
          <div className="flex w-full flex-1 items-center gap-4 lg:justify-end">
            <div className="">
              <form action="max-w-sm mx-auto">
                <Select>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Hoje" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Hoje</SelectItem>
                    <SelectItem value="dark">Semana</SelectItem>
                    <SelectItem value="system">Mês</SelectItem>
                  </SelectContent>
                </Select>
              </form>
            </div>

            {/* <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button asChild>
                  <div className="flex items-center justify-center gap-3">
                    <IconCalendarPlus />
                    Reservar
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-max h-max">
                <DialogHeader>
                  <DialogTitle>Agendamento</DialogTitle>
                  <DialogDescription>
                    Agende laboratório ou equipamentos.
                  </DialogDescription>
                </DialogHeader>
                <Separator className="mt-2" />
                <ReservaModal setOpen={setOpen} />
              </DialogContent>
            </Dialog> */}
            <Modal
              titleButton="Reservar"
              title="Agendamento"
              description="Agende laboratório ou equipamentos."
            >
              <ReservaForm />
              <p>teste</p>
            </Modal>
          </div>
        </Header>

        <Agenda />
      </Article>
    </Main>
  );
};

export default Page;
