"use client"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon: string
        isDisabled?: boolean
    }[]
}) {
    const pathname = usePathname();

    return (
        <SidebarMenu >
            {
                items.map((item) => (
                    <SidebarMenuItem key={item.title}
                        title={item.isDisabled ? "Coming Soon" : ""}
                    >
                        <SidebarMenuButton isActive={pathname === item.url}
                            disabled={item.isDisabled}
                            className={
                                cn("cursor-pointer flex items-center gap-2", {
                                    "text-gray-400 hover:bg-transparent active:bg-transparent": item.isDisabled
                                })
                            } >
                            <Image src={item.icon}
                                style={{ filter: pathname === item.url ? 'invert(100%)' : 'none' }}
                                alt={item.title}
                                width={16}
                                height={16}
                            />
                            <span>{item.title} </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))
            }
        </SidebarMenu>
    )
}
