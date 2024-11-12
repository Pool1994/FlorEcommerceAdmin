import { ITableHeader } from '@/@core/contracts/ITable';
export const entrieFields: Array<ITableHeader> = [
  {
    title: '#',
    key: 'counter',
  },
  {
    title: 'Fecha',
    key: 'date_movement',
  },
  {
    title: 'Documento',
    key: 'document',
  },
  {
    title: 'Motivo de movimiento',
    key: 'motive',
  },
  {
    title: "Estado",
    key: "status",
  },
  {
    title: "Acciones",
    key: "actions",
  }
];
