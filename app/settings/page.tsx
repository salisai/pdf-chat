import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/app/dashboard/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function SettingsContent() {
    return (
        <div className="p-6 md:p-8 space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your account settings and preferences.
                </p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            This is how others will see you on the site.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/user-avatar.png" />
                                <AvatarFallback className="text-lg">JD</AvatarFallback>
                            </Avatar>
                            <Button variant="outline">Change Avatar</Button>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Display Name</Label>
                            <Input id="name" defaultValue="John Doe" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue="john.doe@example.com" disabled />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>API Usage</CardTitle>
                        <CardDescription>
                            View your current usage and plan limits.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">Monthly PDF Uploads</span>
                                <span className="text-muted-foreground">5 / 20</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[25%]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">Chat Messages</span>
                                <span className="text-muted-foreground">142 / 1000</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[14%]" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Free Plan</span>
                        <Button variant="outline">Upgrade Plan</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <SettingsContent />
        </DashboardLayout>
    );
}
