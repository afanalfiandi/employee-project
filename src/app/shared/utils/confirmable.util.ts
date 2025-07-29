import Swal from 'sweetalert2';
import { Toast } from './toast.util';

export function Confirmable(
    icon: 'success' | 'error' | 'info' | 'warning',
    message: string,
    title: string,
    confirmButtonText: string,
    confirmEvent: () => void
) {
    Swal.fire({
        title: title,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        denyButtonText: `Cancel`,
        text: message,
        icon: icon,
    }).then((result) => {
        if (result.isConfirmed) {
            confirmEvent();
            Toast('success', 'Success!')
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
}