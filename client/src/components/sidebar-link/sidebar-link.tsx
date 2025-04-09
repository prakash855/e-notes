import { SidebarConfigItem } from "@/types";

const SidebarLink = ({ icon: Icon, label }: SidebarConfigItem) => (
  <div
    className="flex rounded py-3 font-semibold cursor-pointer hover:bg-slate-300 items-center"
    style={{ borderRadius: "0 25px 25px 0" }}
  >
    <div className="mx-5">
      <Icon />
    </div>
    <div>{label}</div>
  </div>
);

export default SidebarLink;
