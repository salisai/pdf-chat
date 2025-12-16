import { MotionWrapper } from "@/components/ui/motion-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-neutral-50/50">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 font-bold text-lg z-10">
                <span>ChatPDF</span>
            </Link>

            <MotionWrapper className="w-full max-w-[400px] z-10 p-4">
                <Card className="w-full border border-neutral-200 shadow-2xl rounded-xl bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-1 text-center pt-8">
                        <CardTitle className="text-2xl font-bold tracking-tight text-black">Welcome back</CardTitle>
                        <CardDescription className="text-neutral-500">
                            Enter your email to sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-5 px-8 pb-8">
                        <div className="grid gap-2">
                            <Button variant="outline" className="w-full bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-md h-10 shadow-sm font-medium">
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Continue with Google
                            </Button>
                        </div>
                        <div className="relative my-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-neutral-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-neutral-400">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="font-medium text-neutral-700">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" className="h-10 border-neutral-200 bg-white" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="font-medium text-neutral-700">Password</Label>
                                <Input id="password" type="password" className="h-10 border-neutral-200 bg-white" />
                            </div>
                        </div>
                        <Button className="w-full h-10 text-base font-medium shadow-md">Sign In</Button>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 pb-8 border-t border-neutral-100 pt-6">
                        <div className="text-sm text-neutral-500 text-center">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="font-medium text-black hover:underline transition-all">
                                Sign up
                            </Link>
                        </div>
                        <div className="text-xs text-neutral-400 text-center">
                            <Link href="#" className="hover:text-black transition-colors">Forgot password?</Link>
                        </div>
                    </CardFooter>
                </Card>
            </MotionWrapper>
        </div>
    );
}
