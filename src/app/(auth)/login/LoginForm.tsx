'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormData } from "@/lib/validation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/queries/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/authStore";

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login, isLoading } = useLogin();
    const setUser = useAuthStore((state) => state.setUser);

    const onSubmit = (data: LoginFormData) => {
        if (isLoading) return;

        login(data, {
            onSuccess: (response) => {
                setUser(response.user);
                router.push("/home");
            },
        });
    };


    return (
        <div className="relative">
            <form onSubmit={handleSubmit(onSubmit)} className={`space-y-5 ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                        Email Address
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="your@email.com"
                        className="nes-input rounded-xl border-neutral-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all h-12 px-4"
                    />
                    {errors.email && <p className="text-error">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-neutral-700">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="nes-input rounded-xl border-neutral-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all pr-10 h-12 px-4"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-error">{errors.password.message}</p>}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-pink-300 text-xl text-white font-semibold rounded-xl py-3 h-12 transition-all flex items-center justify-center gap-2 shadow-lg border-2"
                >
                    Login
                </Button>
                <div className="relative flex items-center justify-center my-6">
                    <div className="border-t border-neutral-200 absolute w-full"></div>
                    <span className="bg-white px-4 text-sm text-neutral-500 relative">or continue with</span>
                </div>
                <button
                    type="button"
                    className="w-full bg-white hover:bg-neutral-50 text-neutral-700 font-medium rounded-xl py-3 transition-all flex items-center justify-center gap-2 border-2 border-neutral-200 h-12"
                >
                    <FcGoogle size={20} />
                    Google
                </button>
                {isLoading && <Spinner />}
            </form>
        </div>
    );
}
