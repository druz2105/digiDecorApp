import {create} from "zustand";
import {getAllCategories, getProductByCategory} from "../../services/productAPI";
import {CategoriesListAPIResponse} from "../../services/interfaces/product-interface";

type ProductStore = {
    categories: Array<CategoriesListAPIResponse>,
    products: Array<Record<string, string>> | Array<any>,
    fetchCategories: () => Promise<void>,
    fetchProductByCategory: (categoryId: string) => Promise<void>,
};


export const useProductStore = create<ProductStore>((set, get) => ({
    categories: [],
    products: [],
    fetchCategories: async () => {
        try {
            const categories = await getAllCategories();
            set((prevState) => {
                return {
                    ...prevState,
                    categories: categories
                }
            });
        } catch (err) {
            throw err
        }
    },
    fetchProductByCategory: async (categoryId: string) => {
        try {
            console.log(categoryId, "categoryId>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            const products = await getProductByCategory(categoryId);
            set((prevState) => {
                return {
                    ...prevState,
                    products: products
                }
            });
        } catch (err) {
            throw err
        }
    }
}));