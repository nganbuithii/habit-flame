import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Habit } from '@/lib/subabase/type';

interface DeleteConfirmationProps {
    habit: Habit;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteConfirmation = ({
    isOpen,
    onClose,
    onConfirm
}: DeleteConfirmationProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to permanently
                        delete this file from our servers?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-center gap-4 sm:justify-center pt-2">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md border border-gray-300 hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-red-300 text-white rounded-md  transition-colors"
                    >
                        Delete
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};