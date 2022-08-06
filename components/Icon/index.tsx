import MailSent from "./mailSent.svg";

type Props = {
  icon: string;
  color: string;
  width: number;
  height: number;
};

export const Icon = ({ color, height, icon, width }: Props) => {
  return (
    <div style={{ width, height }}>
      {icon === "mailSent" && <MailSent color={color} />}
    </div>
  );
};
