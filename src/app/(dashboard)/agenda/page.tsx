"use client";
import { useEffect, useState } from "react";
import { IconCalendarPlus } from "@tabler/icons-react";
import { useFetch } from "@/data/hooks/useFetch";

import { Article } from "@/components/Article";
import Link from "next/link";
import { ReserveType } from "@/data/@types/reserve.type";

const Page = () => {
  const { getData } = useFetch();
  const [data, setData] = useState<ReserveType[]>([]);

  const loadData = async () => {
    try {
      const response = await getData<ReserveType>("/agenda");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
        {data?.map((item) => (
          <div key={item.id}>
            <div>{item.status}</div>
            <div>{item.date}</div>
            <div>{item.students}</div>
            <div>{item.classCode}</div>
            <div>{item.book}</div>
          </div>
        ))}
      </section>
    </Article>
  );
};

export default Page;
