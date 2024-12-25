import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { useState } from "react"
import { DialogDescription } from "@radix-ui/react-dialog"

export function AddRepoDialog({ children }:
    { children: React.ReactNode }
) {
    const [repoName, setRepoName] = useState("")
    const [open, setOpen] = useState(false)

    const handleSubmit = () => {
        if (!repoName) {
            return toast.error("Please enter repo name")
        }
        toast.success("Repo added successfully")
        setOpen(false)
    }
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild >
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" >
                <DialogHeader>
                    <DialogTitle>Add Repo</DialogTitle>
                    <DialogDescription>
                        This logic is not yet implemented
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Input type="text"
                        placeholder="Enter repo name"
                        onChange={(e) => setRepoName(e.target.value)}
                    />
                </div>
                <DialogFooter className="sm:justify-end" >
                    <Button
                        onClick={handleSubmit}
                        type="submit" >
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
