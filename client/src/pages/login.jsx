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
import { useRegisterUserMutation, useLoginUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
const Login = () => {
    //state
    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });

    const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
    const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

    const navigate = useNavigate();

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

    //clicks signup/login button-> triggers respective mutation
    const handleRegistration = async (type) => {
        const inputData = type === 'login' ? loginInput : signupInput;
        const action = type === 'login' ? loginUser : registerUser;
        await action(inputData);
    };

    useEffect(() => {
        if (registerData && registerIsSuccess) {
            toast.success(registerData.message || "signup successful");
        }
        if (registerError) {
            toast.error(registerError.data.message || "signup failed");
        }
        if (loginData && loginIsSuccess) {
            toast.success(loginData.message || "login successful");
            navigate("/");
        }
        if (loginError) {
            toast.error(loginError.data.message || "login failed");
        }
    }, [registerData, loginData, registerIsLoading, loginIsLoading, registerError, loginError]);
    return (
        <div className="flex justify-center min-h-screen mt-25 ">
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
                                <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                                    {
                                        loginIsLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Logging in...
                                            </>
                                        ) : "Login"
                                    }
                                </Button>
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
                                <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                                    {
                                        registerIsLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Signing up...
                                            </>
                                        ) : "sign up"
                                    }
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>

    )
}
export default Login;