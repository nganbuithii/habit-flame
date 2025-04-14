
import { habitApiRequest } from "@/apiRequest/habit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetListHabit = ({ id, enabled }: { id: string; enabled: boolean }) => {
    return useQuery({
        queryKey: ['habits'],
        queryFn: () => habitApiRequest.getListHabit(id), enabled,
      
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
export const useGetDetailHabit = ({ id, enabled }: { id: string; enabled: boolean }) => {
    return useQuery({
        queryKey: ['habit', id],
        queryFn: () => habitApiRequest.getHabitDetail(id),
        enabled,
        select: (data) => ({
            habit: data.habit,
            activities: data.activities
          })
    })
}
export const useCheckInHabit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => habitApiRequest.checkInHabit(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['habit', id] });
            queryClient.invalidateQueries({ queryKey: ['habits'] });
            queryClient.refetchQueries({ queryKey: ['habits'] });
        },
        
    });
};
export const useDeleteHabit = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => habitApiRequest.deleteHabit(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['habits'] });
        },
    });
};

export const useEditHabit = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, name }: { id: string; name: string }) => habitApiRequest.editHabitName(id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['habits'] });
        },
        onError: (error) => {
            console.error("Failed to edit habit:", error);
          },
          
    });
};