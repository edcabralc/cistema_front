import { CardList } from "@/components/card/card-list";
import { Suspense } from "react";

const Agenda = () => (
  <section className="flex flex-col gap-4">
    <Suspense fallback={<p>Suspense...</p>}>
      <CardList />
    </Suspense>
  </section>
);

export { Agenda };
