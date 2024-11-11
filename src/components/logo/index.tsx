import Image from "next/image";

export const Logo = () => {
  return (
    <div className="self-center p-6">
      <Image
        src={"/logo_cistema.webp"}
        width={200}
        height={50}
        alt="Centro de Idiomas Senac"
      />
    </div>
  );
};
