import { FC } from "react";
import { IoArchiveOutline, IoHomeOutline } from "react-icons/io5";
import { TbNotes } from "react-icons/tb";
import { Link } from "react-router-dom";

import { getToken } from "@/helpers/token";
import { SidebarConfigItem } from "@/types";

import SidebarLink from "@/components/sidebar-link/sidebar-link";

const Sidebar: FC = () => {
  const isAuthenticated = Boolean(getToken());

  const publicSidebarConfig: SidebarConfigItem[] = [
    { icon: IoHomeOutline, label: `Signup`, path: "/signup" },
    { icon: IoHomeOutline, label: `Login`, path: "/login" },
  ];

  const ProtectedSidebarConfig: SidebarConfigItem[] = [
    { icon: TbNotes, label: `Notes`, path: "/" },
    { icon: IoArchiveOutline, label: `Archive`, path: "/archive" },
  ];

  const sidebarConfigToRender = isAuthenticated
    ? ProtectedSidebarConfig
    : publicSidebarConfig;

  return (
    <>
      <div className="m-8 font-extrabold">e-Notes</div>
      {sidebarConfigToRender.map(({ icon, label, path = "/" }) => (
        <Link to={path} key={label}>
          <SidebarLink icon={icon} label={label} />
        </Link>
      ))}
    </>
  );
};

export default Sidebar;
