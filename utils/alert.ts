import Swal from 'sweetalert2';

interface AlertOptions {
  type: 'info' | 'error' | 'success' | 'question' | 'warning';
  content?: string;
  width?: string;
  confirmButtonText: string;
  cancelButtonText?: string;
}

export async function myAlert(options: AlertOptions) {
  const { type, content, width, confirmButtonText, cancelButtonText } = options;

  return await Swal.fire({
    icon: type,
    position: 'center',
    text: content,
    width: width ?? '300px',
    confirmButtonText,
    confirmButtonColor: '#2563eb',
    showCancelButton: !!cancelButtonText,
    cancelButtonText,
    cancelButtonColor: '#ef4444',
  });
}
