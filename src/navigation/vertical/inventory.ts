import type { NavGroup, NavLink, NavSectionTitle } from '@layouts/types';


const inventory: Array<NavLink | NavGroup | NavSectionTitle> = [
  {
    title: 'Inventario',
    icon: {
      icon: 'tabler-box'
    },
    children: [
      {
        title: 'Categorias',
        to: 'inventory-category'
      },
      {
        title: 'Sub Categorias',
        to: 'inventory-sub-category'
      },
      {
        title: 'Marcas',
        to: 'inventory-brands'
      },
      {
        title: 'Presentacion',
        to: 'inventory-presentation'
      },
      {
        title: 'Productos',
        to: 'inventory-product'
      },
      {
        title: 'Almacenes',
        to: 'inventory-warehouse'
      },
      {
        title: 'Movimientos',
        to: {
          name: "inventory-movements-tab",
          params: {
            tab: 'entries'
          }
        }

      }
    ]
  }
];
export default inventory;
