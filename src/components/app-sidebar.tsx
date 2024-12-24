import { useLocation } from "react-router-dom";
import { BiSolidLeaf } from "react-icons/bi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { SlSpeedometer } from "react-icons/sl";
import { BiSolidBookContent } from "react-icons/bi";
import { BiBookBookmark } from "react-icons/bi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { AiOutlinePieChart } from "react-icons/ai";
import { RiSettingsLine } from "react-icons/ri";

const items = [
  { title: "Dashboard", url: "/dashoard", icon: SlSpeedometer },
  { title: "Students", url: "/", icon: BiSolidBookContent },
  { title: "Chapter", url: "/chapter", icon: BiBookBookmark },
  { title: "Help", url: "/help", icon: IoIosHelpCircleOutline },
  { title: "Reports", url: "/reports", icon: AiOutlinePieChart },
  { title: "Settings", url: "/settings", icon: RiSettingsLine },
];

export function AppSidebar({
  setColps,
}: {
  setColps: (collapsed: boolean) => void;
}) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
    setColps(!collapsed);
  };

  return (
    <Sidebar
      className={`transition-width duration-300 ${collapsed ? "w-16" : "w-64"}`}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {!collapsed && (
              <div className="flex items-center space-x-2 p-2 mt-10">
                <BiSolidLeaf size={30} className="text-black" />
                <span className="text-3xl font-extrabold text-black font-mono">
                  Quyl.
                </span>
              </div>
            )}
            <button
              onClick={handleCollapse}
              className="ml-auto mt-10 p-2 bg-slate-200"
              title={collapsed ? "Expand" : "Collapse"}
            >
              {collapsed ? (
                <IoIosArrowForward size={20} />
              ) : (
                <IoIosArrowBack size={20} />
              )}
            </button>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-14">
            <SidebarMenu>
              {items.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={url}
                      className={`flex items-center space-x-1 p-5 rounded mt-2 ${
                        location.pathname === url
                          ? "bg-slate-200 text-black"
                          : "hover:bg-slate-300"
                      } ${collapsed ? "justify-center" : ""}`}
                    >
                      <Icon
                        className={`${
                          location.pathname === url
                            ? "text-black"
                            : "text-gray-500"
                        }`}
                        style={{ width: "18px", height: "18px" }}
                      />

                      {!collapsed && (
                        <span
                          className={`text-[1rem] ${
                            location.pathname === url
                              ? "text-black"
                              : "text-gray-500"
                          }`}
                        >
                          {title}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
