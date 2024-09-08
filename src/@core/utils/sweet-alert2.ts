import Swal, { SweetAlertOptions } from 'sweetalert2';
type AlertOptions = {
  title: string;
  text: string;
  icon: 'success' | 'error' | 'warning' | 'info' | 'question';
  fnReload?: () => void;
};
type DeleteOptions = AlertOptions & {
  fnAction?: () => Promise<string>;
}
const config: SweetAlertOptions = {
  allowOutsideClick: false,
  reverseButtons: true

}
export const pruebaAlert = () => {
  Swal.fire({
    ...config,
    title: 'Pruebas',
    icon: 'success',
  });
}
export const deleteConfirm = (opt: DeleteOptions) => {
  Swal.fire({
    ...config,
    title: opt.title,
    text: opt.text,
    icon: opt.icon,
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        const result = await opt.fnAction?.();
        return result;
      } catch (ex: any) {
        Swal.showValidationMessage(ex.message);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then(result => {
    const { isConfirmed, isDismissed, isDenied } = result;
    if (result.isConfirmed) {
      opt.fnReload?.();
      Swal.fire({
        title: "¡Operación realizada con exito!",
        icon: "success",
        text: result.value,
      });
    }
  })
}
