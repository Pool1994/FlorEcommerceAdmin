import { ITableHeader } from "@/@core/contracts/ITable";

export const subCategoryFields: Array<ITableHeader> = [
  {
    title: "Nombre",
    key: "name",
    sortable: false,
  },
  {
    title: "Categoria",
    key: "category",
    sortable: false,
  },
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
