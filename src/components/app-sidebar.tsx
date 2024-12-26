"use client"

import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { LogOut, Phone, X } from "lucide-react"
import {
    useUser,
} from "@/components/context/UserContext";
import { useIsMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import Link from "next/link"

const data = {
    navMain: [
        {
            title: "Repositories",
            url: "/",
            icon: '/sidebar/home.svg',
            isDisabled: false,
        },
        {
            title: "AI Code Review",
            url: "#",
            icon: '/sidebar/code.svg',
            isDisabled: true,
        },
        {
            title: "Cloud Security",
            url: "#",
            icon: '/sidebar/cloud.svg',
            isDisabled: true,
        },
        {
            title: "How to Use",
            url: "#",
            icon: '/sidebar/book.svg',
            isDisabled: true,
        },
        {
            title: "Settings",
            url: "#",
            icon: '/sidebar/gear.svg',
            isDisabled: true,
        }
    ],
}

const users = ["saitaruns", "torvalds", "karpathy"]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {
        user,
        setUser,
    } = useUser();

    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();

    return (
        <Sidebar {...props} >
            <SidebarHeader className="prose max-w-none [&_*]:my-0 px-4 flex flex-row items-center justify-between mt-2 md:mt-4" >
                <Link
                    href={`/`}
                    className="no-underline">
                    <Image src="/logo_w_text.svg" alt="CodeAnt AI" width={150} height={150} />
                </Link>
                <X
                    onClick={toggleSidebar}
                    className="cursor-pointer block md:hidden" />
            </SidebarHeader>
            <SidebarContent className="px-3 pt-2" >
                <Select
                    value={user}
                    onValueChange={
                        (value) => {
                            setUser(value)
                            if (isMobile) {
                                toggleSidebar();
                            }
                        }
                    } defaultValue="saitaruns" >
                    <SelectTrigger className="w-full" >
                        <SelectValue placeholder="Select User" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            users.map((user) => (
                                <SelectItem
                                    className="cursor-pointer"
                                    key={user} value={user} >
                                    {user}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className="mb-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="cursor-pointer flex items-center gap-2" >
                            <Phone />
                            <span>Support</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href={`/login`} className="no-underline" >
                            <SidebarMenuButton className="cursor-pointer flex items-center gap-2">
                                <LogOut className="size-4" />
                                <span>
                                    Logout
                                </span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
