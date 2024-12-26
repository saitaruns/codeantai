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
    SidebarGroup,
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
        <Sidebar collapsible="icon" {...props} >
            <SidebarHeader className="px-4 flex flex-row items-center justify-between mt-2 md:mt-4" >
                <Link
                    href={`/`}
                    className="no-underline group-data-[collapsible=icon]:hidden" >
                    <Image src="/logo_w_text.svg" alt="CodeAnt AI" width={150} height={150} />
                </Link>
                <Link
                    href={`/`}
                    className="no-underline hidden group-data-[collapsible=icon]:flex" >
                    <Image src="/logo.svg" alt="CodeAnt AI"
                        width={20} height={20} />
                </Link>
                <X
                    onClick={toggleSidebar}
                    className="cursor-pointer block md:hidden" />
            </SidebarHeader>
            <SidebarContent className="px-2 pt-2" >
                <SidebarGroup className="group-data-[collapsible=icon]:hidden p-0">
                    <Select
                        value={user}
                        onValueChange={
                            (value) => {
                                setUser(value)
                                if (isMobile) {
                                    toggleSidebar();
                                }
                            }
                        }
                        defaultValue="saitaruns"
                    >
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
                </SidebarGroup>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className="mb-2" >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="cursor-pointer flex items-center gap-2  text-gray-400 hover:bg-transparent active:bg-transparent" >
                            <Phone />
                            <span>Support </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href={`/login`} className="no-underline" >
                            <SidebarMenuButton className="cursor-pointer flex items-center gap-2" >
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
