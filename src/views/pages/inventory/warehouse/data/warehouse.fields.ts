import { ITableHeader } from "@/@core/contracts/ITable";

export const wareHouseFields: Array<ITableHeader> = [
  {
    title: "Nombre",
    key: "name",
    sortable: false,
  },
  {
    title: "Dirección",
    key: "address",
    sortable: false,
  },
  {
    title: "Distrito/Provincia",
    key: "ubigeo",
    sortable: false,
  },
  {
    title: "Observaciones",
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
