import Swal from 'sweetalert2';

export function Confirmable(
    icon: 'success' | 'error' | 'info' | 'warning',
    message: string,
    title: string,
    confirmButtonText: string,
) {
    Swal.fire({
        title: title,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        denyButtonText: `Cancel`
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
}