import { Link } from "react-router-dom";

export default function Anchor({ children, to, className }) {
  return (
    <Link
      className={`${window.location.pathname.match(to) && "after:absolute after:-bottom-1 after:left-0 after:-z-20 after:contents after:h-1 after:w-full after:rounded-md after:bg-blue-500"} relative ${className}`}
      to={to}
    >
      {children}
    </Link>
  );
}
