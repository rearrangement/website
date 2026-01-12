import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ProfileCard() {
  return (
    <div className="flex items-center justify-center h-screen">
        <Card className="w-1/2 h-5/8 flex flex-row">
            <Navbar />
            <div className="flex-1">
              <CardHeader className="justify-right">
                <CardTitle>Login to your account ihbetrg9 jertguje ruiheg iuergi huergiu herguih ergiu eriuuhifgerw</CardTitle>
              </CardHeader>
            </div>
        </Card>
    </div>
  )
}
