// https://ui.shadcn.com/docs/components/tabs

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


const Login = ()=>{
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
        <div className="flex w-full max-w-sm flex-col gap-6">

      <Tabs defaultValue="login">

        <TabsList>
          <TabsTrigger value="login">login</TabsTrigger>
          <TabsTrigger value="signup">signup</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>login</CardTitle>
              <CardDescription>
                Enter your credentials if you have already registered.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">

               <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="abc@gmail.com" required="true"/>
              </div>

               <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input type="password" placeholder="########" required="true"/>
              </div>


            </CardContent>
            <CardFooter>
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>signup</CardTitle>
              <CardDescription>
                Enter Sign up details for new registration.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">

              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input type="text" placeholder="Chetna Dua" required="true" />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="abc@gmail.com" required="true"/>
              </div>

               <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input type="password" placeholder="########" required="true"/>
              </div>

            </CardContent>
            <CardFooter>
              <Button>Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </div>
     
  )
}
export default Login;