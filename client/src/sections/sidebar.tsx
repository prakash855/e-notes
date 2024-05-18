import { FC } from "react";
import { IconType } from "react-icons";
import { IoArchiveOutline, IoHomeOutline } from "react-icons/io5";
import { TbNotes } from "react-icons/tb";
import { Link } from "react-router-dom";

import SidebarLink from "../components/sidebar-link/sidebar-link";

export interface SidebarConfigItem {
  icon: IconType;
  label: string;
  path?: string;
}

const Sidebar: FC = () => {
  const sidebarConfig: SidebarConfigItem[] = [
    { icon: TbNotes, label: `Notes`, path: "/" },
    { icon: IoArchiveOutline, label: `Archive`, path: "/archive" },
    // { icon: IoHomeOutline, label: `Signup`, path: "/signup" },
    { icon: IoHomeOutline, label: `Login`, path: "/login" },
  ];

  return (
    <>
      <div className="m-8 font-extrabold">e-Notes</div>
      {sidebarConfig.map(({ icon, label, path }) => (
        <Link to={path || "/"} key={label}>
          <SidebarLink icon={icon} label={label} />
        </Link>
      ))}
    </>
  );
};

export default Sidebar;
