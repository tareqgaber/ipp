import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import avatar from "@/assets/images/avatar.jpg"

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="
            flex items-center gap-3 px-4 py-3 rounded-xl
            shadow-none focus-visible:ring-0 focus-visible:ring-offset-0
            active:shadow-none focus:shadow-none
          "
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt="@user" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left leading-tight">
            <span className="text-base font-medium font-['Inter'] leading-6 text-black">
              John Doe
            </span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-48 rounded-xl p-2 shadow-md"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">
          Manage Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => console.log("Settings")}
          className="px-2 py-2 rounded-md hover:bg-muted/70 cursor-pointer"
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => console.log("Logout")}
          className="px-2 py-2 rounded-md hover:bg-muted/70 cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
