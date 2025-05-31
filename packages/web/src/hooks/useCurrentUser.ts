import { useQuery } from '@tanstack/react-query';
import { AuthService } from '@watcha-clone/shared';

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: AuthService.getCurrentUser,
        staleTime : 1000 * 60 * 5,
        retry: 1, 
    })
}