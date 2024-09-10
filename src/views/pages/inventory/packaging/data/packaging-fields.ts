import { ITableHeader } from "@/@core/contracts/ITable";

export const packagingHeaders: Array<ITableHeader> = [
  {
    title: "Description",
    key: "description",
    sortable: false,
  },
  {
    title: "Fecha creacion",
    key: "created_at",
    sortable: false,
  },
  {
    title: "Acciones",
    key: "actions",
    sortable: false,
  },
];
