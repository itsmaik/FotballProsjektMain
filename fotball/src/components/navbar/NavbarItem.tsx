import { Link } from "react-router-dom";

type NavbarItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

export function NavbarItem({ to, icon, label }: NavbarItemProps) {
  return (
    <Link to={to} className="flex flex-col items-center gap-1 ">
      <span className="text-2xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
