
import { habitApiRequest } from "@/apiRequest/habit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetListHabit = ({ id, enabled }: { id: string; enabled: boolean }) => {
    return useQuery({
        queryKey: ['habits'],
        queryFn: () => habitApiRequest.getListHabit(id), enabled
    })
}

export const useAddHabit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: habitApiRequest.addHabit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['habits'] })
        }
    })
}


