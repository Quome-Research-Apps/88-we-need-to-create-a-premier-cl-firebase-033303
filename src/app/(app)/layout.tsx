import { BrainCircuit, User } from "lucide-react";
import Link from "next/link";
import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GeneratedDecksProvider } from "@/contexts/generated-decks-context";
import { SidebarNav } from "@/components/sidebar-nav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GeneratedDecksProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarHeader className="border-b">
              <Link href="/dashboard" className="flex items-center gap-2">
                <BrainCircuit className="h-7 w-7 text-primary" />
                <span className="text-xl font-bold text-foreground">SynapseSpark</span>
              </Link>
            </SidebarHeader>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-16 items-center border-b px-4 md:px-6 justify-between md:justify-end">
                <div className="md:hidden">
                    <SidebarTrigger />
                </div>
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                             <DropdownMenuItem asChild><Link href="/">Logout</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </GeneratedDecksProvider>
  );
}
