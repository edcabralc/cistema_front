import { Card } from "@/components/ui/card";
import style from "@/components/article/article.module.css";

export const Article = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Card className={style.article}>
        <div className={style.children}>{children}</div>
      </Card>
    </>
  );
};
