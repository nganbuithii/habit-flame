import { authApiRequest } from '@/apiRequest/auth';
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    const loginMutation = useMutation({
        mutationFn: authApiRequest.login,
    });

    return {
        login: loginMutation.mutate,
        isLoading: loginMutation.isPending, 
        error: loginMutation.error, 
    };
};
