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
        isActive?: boolean
    }[]
}) {
    const pathname = usePathname();

    return (
        <SidebarMenu className="gap-2" >
            {
                items.map((item) => (
                    <SidebarMenuItem key={item.title} >
                        <SidebarMenuButton asChild isActive={pathname === item.url} className={cn("cursor-pointer", {
                            "!text-[#414651] hover:bg-transparent active:bg-transparent": !item.isActive,
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
