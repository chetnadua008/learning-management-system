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


import { useState } from "react"
const Login = () => {
    //state
    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });

    //update state when form data change
    //bonus step: convert email to lowercase 
    const inputChangeHandler = (e, type) => {
        const { name, value } = e.target;
        const cleanValue = name === "email" ? value.trim().toLowerCase() : value;

        if (type === 'signup') {
            setSignupInput({ ...signupInput, [name]: cleanValue });
        } else {
            setLoginInput({ ...loginInput, [name]: cleanValue });
        }
    }

    //clicks signup/login button-> console the state
    const submitHandler = (type) => {
        const input = type === 'login' ? loginInput : signupInput;
        console.log(input)
    }

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
                                    <Input name="email" value={loginInput.email} onChange={(e) => inputChangeHandler(e, "login")} type="email" placeholder="abc@gmail.com" required />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input name="password" value={loginInput.password} onChange={(e) => inputChangeHandler(e, "login")} type="password" placeholder="########" required />
                                </div>

                            </CardContent>

                            <CardFooter>
                                <Button onClick={() => submitHandler("login")}>Login</Button>
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
                                    <Input name="name" value={signupInput.name} onChange={(e) => inputChangeHandler(e, "signup")} type="text" placeholder="Chetna Dua" required />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input name="email" value={signupInput.email} onChange={(e) => inputChangeHandler(e, "signup")} type="email" placeholder="abc@gmail.com" required />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input name="password" value={signupInput.password} onChange={(e) => inputChangeHandler(e, "signup")} type="password" placeholder="########" required />
                                </div>

                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => submitHandler("signup")}>Signup</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>

    )
}
export default Login;