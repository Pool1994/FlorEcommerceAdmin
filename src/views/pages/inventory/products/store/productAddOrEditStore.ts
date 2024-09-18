import { BrandModel } from "@/@app/inventory/brand/IBrandContracts";
import { CategoryModel } from "@/@app/inventory/category/ICategoryContracts";
import { IDetailInventoryForm, IProductForm } from "@/@app/inventory/products/IProductoContract";
import ProductRelationsService from "@/@app/inventory/products/services/ProductRelationsService";
import { SubCategoryModel } from "@/@app/inventory/subcategory/ISubCategoryContracts";
import { WareHouseModel } from "@/@app/inventory/warehouse/IWareHouse";
import { ISunatProductCode, TaxModel } from "@/@app/shared/ISunatProductCode";

export const useProductForm = defineStore('productAddOrEditStore', () => {
  const form = ref<IProductForm>({
    category_id: null as any,
    sub_category_id: null as any,
    brand_id: null as any,
    name: '',
    description: '',
    unit_price: null as any,
    use_inventory: 'SI',
    tax_id: null as any,
    stock: 0,
    sku: '',
    barcode: '',
    minumun_stock: 0,
    photo: '',
    initial_cost: 0,
    base_price: 0,
    sunat_product_code_id: null as any
  });
  const categories = ref<CategoryModel[]>([]);
  const subCategories = ref<SubCategoryModel[]>([]);
  const brands = ref<BrandModel[]>([]);
  const sunatCodes = ref<Array<ISunatProductCode>>([]);
  const taxes = ref<Array<TaxModel>>([]);
  const wareHouses = ref<Array<WareHouseModel>>([]);
  const detailsInventory = ref<Array<IDetailInventoryForm>>([]);
  watch(() => form.value.category_id, (value) => {
    if (value) {
      form.value.sub_category_id = null as any;
      getSubCategories(value);
    }
  });

  const changeBasePrice = () => {
    const value = Number(form.value.base_price);
    if (value) {
      const tax = taxes.value.find(item => item.id == form.value.tax_id);
      const valueTax = value * Number(tax?.percentage) / 100;
      form.value.unit_price = Number((value + valueTax).toFixed(2));
    }
  }

  const changeUnitPrice = () => {
    const value = Number(form.value.unit_price);
    const tax = taxes.value.find(item => item.id == form.value.tax_id);
    const base_price = value / (1 + Number(tax?.percentage) / 100);
    form.value.base_price = Number((base_price).toFixed(2));
  }
  const getCategories = async () => {
    try {
      const result = await ProductRelationsService.categories();
      categories.value = result;
    } catch (e) {
      throw e;
    }
  }
  const getSubCategories = async (categoryId: number) => {
    try {
      const result = await ProductRelationsService.sbucategories(categoryId);
      subCategories.value = result;
    } catch (e) {
      throw e;
    }
  }
  const getBrands = async () => {
    try {
      const result = await ProductRelationsService.brands();
      brands.value = result;
    } catch (e) {
      throw e;
    }
  }
  const getSunatCodes = async (value: string | number) => {
    try {
      const result = await ProductRelationsService.sunatCodes(value);
      sunatCodes.value = result;
    } catch (e) {
      throw e;
    }
  }
  const searchSunatCodes = async (value: string | number) => {
    try {
      if (!isEmpty(value)) {
        await getSunatCodes(value);
      } else {
        sunatCodes.value = [];
      }
    } catch (e) {
      throw e;
    }
  }
  const getTaxes = async () => {
    try {
      const result = await ProductRelationsService.taxes();
      taxes.value = result;
    } catch (e) {
      throw e;
    }
  }
  const getWareHouses = async () => {
    try {
      const result = await ProductRelationsService.warehouses();
      wareHouses.value = result;
      detailsInventory.value.push({
        warehouse_id: result[0].id,
        ware_house: result[0].name,
        quantity: null as any,
        minimum_quantity: null as any,
        maximum_quantity: null as any,
        completed: false
      });
    } catch (e) {
      throw e;
    }
  }
  const refreshForm = () => {
    form.value = {
      category_id: null as any,
      sub_category_id: null as any,
      brand_id: null as any,
      name: '',
      description: '',
      unit_price: null as any,
      use_inventory: 'SI',
      tax_id: 1,
      stock: 0,
      sku: '',
      barcode: '',
      minumun_stock: null as any,
      photo: '',
      initial_cost: null as any,
      base_price: null as any,
      sunat_product_code_id: null as any,

    }
  }
  return {
    form,
    categories,
    subCategories,
    brands,
    taxes,
    sunatCodes,
    detailsInventory,
    refreshForm,
    getCategories,
    getBrands,
    searchSunatCodes,
    getTaxes,
    changeBasePrice,
    changeUnitPrice,
    getWareHouses
  }
});
