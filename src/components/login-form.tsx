import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const options = {
    saas: [
      {
        icon: '/socials/github.svg',
        text: "Sign in with Github",
      },
      {
        icon: '/socials/bitbucket.svg',
        text: "Sign in with Bitbucket",
      },
      {
        icon: '/socials/azure.svg',
        text: "Sign in with Azure Devops",
      },
      {
        icon: '/socials/gitlab.svg',
        text: "Sign in with GitLab",
      },
    ],
    self: [
      {
        icon: '/socials/gitlab.svg',
        text: "Sign in with GitLab",
      },
      {
        icon: '/socials/sso.svg',
        text: "Sign in with SSO",
      },
    ]
  }

  return (
    <form className={cn("flex flex-col gap-6 prose lg:prose-xl max-w-none bg-white", className)} {...props}>
      <div className="grid gap-6 border rounded-xl" >
        <div className="space-y-4 text-center pt-5" >
          <Link href={`/`} className="flex items-center justify-center gap-2 no-underline" >
            <Image src="/logo.svg" alt="CodeAnt AI" width={24} height={24} />
            <h5 className="font-normal !mt-1" > CodeAnt AI </h5>
          </Link>
          <h3> Welcome to CodeAnt AI </h3>
        </div>
        <Tabs defaultValue="saas" className="w-full h-[350px] space-y-4">
          <div className="border-b p-8 pt-0">
            <TabsList className="w-full h-12">
              {["saas", "self"].map((type) => (
                <TabsTrigger key={type} className="size-full font-semibold" value={type}>
                  {type.toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="w-10/12 sm:w-8/12 mx-auto" >
            {Object.entries(options).map(([key, value]) => (
              <TabsContent key={key} value={key} className="flex flex-col gap-4">
                {value.map((option, index) => (
                  <Link href={`/`} className="no-underline" key={index}>
                    <Button variant="outline" size="lg" className="w-full">
                      <Image src={option.icon} alt={option.text} width={24} height={24} />
                      <span className="font-semibold">
                        {option.text}
                      </span>
                    </Button>
                  </Link>
                ))}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
      < div className="text-center text-sm" >
        By signing up you agree to the{" "}
        <a href="#" className="underline underline-offset-4" >
          Privacy Policy
        </a>.
      </div>
    </form>
  )
}
