import { SidebarConfigItem } from "../../sections/sidebar";

const SidebarLink = ({ icon: Icon, label }: SidebarConfigItem) => {
  return (
    <div
      className="flex rounded py-4 cursor-pointer hover:bg-yellow-100 items-center"
      style={{ borderRadius: "0 25px 25px 0" }}
    >
      <div className="mx-5">
        <Icon />
      </div>
      <div>{label}</div>
    </div>
  );
};

export default SidebarLink;
