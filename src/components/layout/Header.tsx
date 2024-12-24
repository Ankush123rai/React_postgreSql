import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { LuSettings2, LuMessageSquareMore } from "react-icons/lu";
import { GoBell } from "react-icons/go";

export function Header() {
  return (
    <header className="w-full bg-transparent border-b border-gray-200">
      <div className="flex w-full h-full items-center justify-between sm:gap-[5rem] gap-2rem px-4 lg:px-6">
        <div className="relative flex-grow max-w-2xl border border-gray-300 rounded-md w-full bg-white">
          <FaSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="w-full text-black pl-10 text-sm border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="search"
            placeholder="Search your course"
          />
        </div>

        <div className="flex w-full items-center gap-3 md:gap-5">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <IoIosHelpCircleOutline className="h-5 w-5 text-gray-600" />
          </button>
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <LuMessageSquareMore className="h-6 w-6 text-gray-600" />
            {/* Red Dot for Messages */}
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <LuSettings2 className="h-5 w-5 text-gray-600" />
          </button>
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <GoBell className="h-5 w-5 text-gray-600" />
            {/* Red Dot for Notifications */}
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2">
            <img
              src="https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-623.jpg"
              alt="Profile"
              className="h-6 w-6 md:h-8 md:w-8 rounded-md"
            />
            <span className="hidden md:block text-gray-700 font-semibold text-sm md:text-base lg:text-md">
              Ankush Rai
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
