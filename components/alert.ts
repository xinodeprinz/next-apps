import Swal from "sweetalert2"

interface Input {
    title: string;
    icon: "error" | "success" | "info" | "warning" | "question";
}

export default function sweetAlert({ title, icon }: Input) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    return Toast.fire({ icon, title })
}