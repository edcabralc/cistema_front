"use client";
import { useEffect } from "react";
import { IconCalendarPlus } from "@tabler/icons-react";

import { Article } from "@/components/Article";
import Link from "next/link";

const Page = () => {
  return (
    <Article>
      <div className="pb-4 mb-8 flex items-center justify-between border-b">
        <h1 className="font-bold text-2xl ">Agenda de reservas LAB</h1>

        <Link
          className="self-end flex items-center justify-center gap-3  w-6/12 bg-sky-600 rounded p-2 text-white lg:w-1/6"
          href={"/agenda/reservar"}>
          <IconCalendarPlus />
          Reservar
        </Link>
      </div>
      <section>
        <div>fsdfsdfsdf</div>
        <div>fsdfsdfsdf</div>
        <div>fsdfsdfsdf</div>
        <div>fsdfsdfsdf</div>
        <div>fsdfsdfsdf</div>
      </section>
    </Article>
  );
};

export default Page;
