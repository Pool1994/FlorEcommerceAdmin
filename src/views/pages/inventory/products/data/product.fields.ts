import { ITableHeader } from "@/@core/contracts/ITable";

export const productHeaders: Array<ITableHeader> = [
  {
    title: "Codigo",
    key: "code",
    sortable: false,
  },
  {
    title: "Producto",
    key: "name",
    sortable: false,
  },
  {
    title: "Categoria",
    key: "category",
    sortable: false,
  },
  {
    title: "Subcategoria",
    key: "sub_category",
    sortable: false,
  },
  {
    title: "Marca",
    key: "brand",
    sortable: false,
  },
  {
    title: "Stock",
    key: "stock",
    sortable: false,
  },
  {
    title: "Acciones",
    key: "actions",
    sortable: false,
  },
];
