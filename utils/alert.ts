import Swal from 'sweetalert2';

interface AlertOptions {
  type: 'info' | 'error' | 'success' | 'question' | 'warning';
  content?: string;
  width?: string;
  confirmButtonText?: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  toastTimer?: number;
}

export async function dialogAlert({
  type,
  content,
  width = '300px',
  confirmButtonText,
  showCancelButton = false,
  cancelButtonText = '아니오',
}: AlertOptions) {
  const confirmButtonColor = type === 'error' ? '#ef4444' : '#2563eb';

  return await Swal.fire({
    icon: type,
    position: 'center',
    text: content,
    width,
    confirmButtonText: confirmButtonText ?? (showCancelButton ? '예' : '확인'),
    confirmButtonColor,
    showCancelButton,
    cancelButtonText: showCancelButton ? cancelButtonText : undefined,
  });
}

export function toastAlert(
  options: Omit<
    AlertOptions,
    'confirmButtonText' | 'cancelButtonText' | 'showCancelButton'
  >,
) {
  const { type, content, width, toastTimer } = options;

  return Swal.fire({
    icon: type,
    position: 'top-right',
    text: content,
    width: width ?? '400px',
    showConfirmButton: false,
    toast: true,
    timer: toastTimer ?? 2000,
    timerProgressBar: true,
  });
}
