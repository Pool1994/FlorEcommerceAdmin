import { CategoryModel } from "@/@app/inventory/category/ICategoryContracts";
import { SubCategoryModel } from "@/@app/inventory/subcategory/ISubCategoryContracts";
import { ISunatProductCode, TaxModel } from "@/@app/shared/ISunatProductCode";
import { WareHouseModel } from "../../warehouse/IWareHouse";

class ProductRelationsService {
  async categories() {
    try {
      const { data } = await $axiosIns.get<CategoryModel[]>('/product/relations/categories');
      return data;
    } catch (e) {
      throw e;
    }
  }
  async sbucategories(categoryId: number) {
    try {
      const { data } = await $axiosIns.get<SubCategoryModel[]>(`/product/relations/subcategories/${categoryId}`);
      return data;
    } catch (e) {
      throw e;
    }
  }
  async brands() {
    try {
      const { data } = await $axiosIns.get<CategoryModel[]>('/product/relations/brands');
      return data;
    } catch (e) {
      throw e;
    }
  }
  async sunatCodes(search: string | number) {
    try {
      const { data } = await $axiosIns.get<Array<ISunatProductCode>>('/product/relations/sunatCodes', {
        params: {
          search
        }
      });
      return data;
    } catch (e) {
      throw e;
    }
  }
  async taxes() {
    try {
      const { data } = await $axiosIns.get<TaxModel[]>('/product/relations/taxes');
      return data;
    } catch (e) {
      throw e;
    }
  }
  async warehouses() {
    try {
      const { data } = await $axiosIns.get<WareHouseModel[]>('/product/relations/warehouses');
      return data;
    } catch (e) {
      throw e;
    }
  }
}
export default new ProductRelationsService();
