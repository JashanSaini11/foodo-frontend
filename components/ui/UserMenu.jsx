"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/common/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { useCallback } from "react";

function UserMenu({ size = "md" }) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";

  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/");
  }, [logout, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Open account menu"
          className={`
            rounded-full bg-primary flex items-center justify-center
            font-body font-bold text-primary-dark shrink-0
            transition-all duration-200 hover:opacity-90
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-primary
            ${sizeClass}
          `}
        >
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-48 border border-border-light bg-white rounded-2xl p-1 shadow-modal"
      >
        {/* ── Navigation items → asChild + Link fixes the bug ── */}
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex rounded-xl px-3 py-2 text-sm font-body font-medium text-text-heading hover:bg-bg-page cursor-pointer transition-colors"
          >
            View Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/orders"
            className="flex rounded-xl px-3 py-2 text-sm font-body font-medium text-text-heading hover:bg-bg-page cursor-pointer transition-colors"
          >
            My Orders
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 bg-border-light" />

        {/* ── Logout — onSelect is fine (no navigation needed) ── */}
        <DropdownMenuItem
          onSelect={handleLogout}
          className="rounded-xl px-3 py-2 text-sm font-body font-medium text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
