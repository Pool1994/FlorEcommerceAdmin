export interface ModalProps<T> {
  show: boolean;
  title: string;
  item?: T;
  loading?: boolean;
}
export interface IModal<T> {
  modal: ModalProps<T>
}
export interface EmitEvents<T> {
  (e: "update:modal", modal: ModalProps<T>): void;
  (e: "reload"): void;
}
