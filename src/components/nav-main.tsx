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
        <SidebarMenu className="gap-2" >
            {
                items.map((item) => (
                    <SidebarMenuItem key={item.title}
                        title={item.isDisabled ? "Coming Soon" : ""}
                    >
                        <SidebarMenuButton asChild isActive={pathname === item.url}
                            disabled={item.isDisabled}
                            className={cn("cursor-pointer", {
                                "text-gray-400 hover:bg-transparent active:bg-transparent": item.isDisabled
                            })} >
                            <div className="flex items-center gap-2">
                                <Image src={item.icon} alt={item.title} width={16} height={16} />
                                <span>{item.title} </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))
            }
        </SidebarMenu>
    )
}
