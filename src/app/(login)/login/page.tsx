import { LoginForm } from "@/components/login-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { ArrowUp } from 'lucide-react';

export default function LoginPage() {
  const items = [{
    title: "30+",
    text: "Language Support"
  }, {
    title: "10K+",
    text: "Developers"
  }, {
    title: "100K+",
    text: "Hours Saved"
  }
  ]

  return (
    <div className="grid min-h-svh lg:grid-cols-2 prose max-w-none [&_*]:my-0">
      <div className="relative hidden lg:flex justify-center">
        <Card className="w-fit h-fit translate-y-60 rounded-2xl py-4 shadow-[0px_0px_24px_0px_#08173529]">
          <CardHeader className="border-b py-2">
            <CardTitle className="flex items-center gap-2 pb-2" >
              <Image src="/logo.svg" alt="CodeAnt AI" width={24} height={24} />
              <h5 className="!m-0">AI to Detect & Autofix Bad Code</h5>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-6 py-4 justify-center">
            {items.map((item, index) => (
              <div key={index} className="flex items-center flex-col">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="w-fit shadow-[0px_0px_24px_0px_#08173529] rounded-2xl absolute translate-y-96 -translate-x-1/2 right-0">
        <CardTitle />
          <CardContent className="flex gap-10 py-6 justify-center px-8">
            <div className="flex flex-col gap-2">
              <Image
                src="/login_icon.svg"
                alt="Login Icon"
                width={40} height={40} />
              <h4>Issues Fixed</h4>
              <h2>500K+</h2>
            </div>
            <div>
              <div className="flex gap-1 items-center text-[#0049C6] font-bold"><ArrowUp className="size-5" /> 14%</div>
              <p>This week</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col justify-center gap-4 p-6 bg-[#FAFAFA]">
        <LoginForm />
      </div>
    </div>
  )
}
