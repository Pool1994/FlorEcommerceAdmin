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
      }
    ]
  }
];
export default inventory;
