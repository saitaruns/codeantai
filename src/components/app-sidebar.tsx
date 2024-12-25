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
            isActive: true,
        },
        {
            title: "AI Code Review",
            url: "#",
            icon: '/sidebar/code.svg',
            isActive: false,
        },
        {
            title: "Cloud Security",
            url: "#",
            icon: '/sidebar/cloud.svg',
            isActive: false,
        },
        {
            title: "How to Use",
            url: "#",
            icon: '/sidebar/book.svg',
            isActive: false,
        },
        {
            title: "Settings",
            url: "#",
            icon: '/sidebar/gear.svg',
            isActive: false,
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
            <SidebarHeader className="prose max-w-none [&_*]:my-0 px-4 flex flex-row items-center justify-between" >
                <Link
                    href={`/`}
                    className="flex items-center justify-center gap-2 no-underline">
                    <Image src="/logo.svg" alt="CodeAnt AI" width={24} height={24} />
                    <h3 className="font-normal !mt-1">CodeAnt AI </h3>
                </Link>
                <X
                    onClick={toggleSidebar}
                    className="cursor-pointer block sm:hidden" />
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
