import {create} from "zustand";
import {
    getAllCategories,
    getProductByCategory,
    getProductById,
    likeProductById,
    unlikeProductById
} from "../../services/productAPI";
import {CategoriesListAPIResponse} from "../../services/interfaces/product-interface";

type ProductStore = {
    categories: Array<CategoriesListAPIResponse>,
    products: Array<Record<string, any>> | Array<any>,
    product: Record<string, any>,
    fetchCategories: () => Promise<void>,
    fetchProductByCategory: (categoryId: string) => Promise<void>,
    fetchProductById: (id: string) => Promise<void>,
    likeProduct: (id: string) => Promise<void>,
    unlikeProduct: (id: string) => Promise<void>,
    errorMessage: string | null
};


export const useProductStore = create<ProductStore>((set, get) => ({
    categories: [],
    products: [],
    product: {},
    errorMessage: null,
    fetchCategories: async () => {
        try {
            const categories = await getAllCategories();
            set((prevState) => {
                return {
                    ...prevState,
                    categories: categories
                }
            });
        } catch (err: any) {
            set((prevState)=>{
                return {
                    ...prevState,
                    errorMessage: err.message
                }
            })
            throw err
        }
    },
    fetchProductByCategory: async (categoryId: string) => {
        try {
            const products = await getProductByCategory(categoryId);
            set((prevState) => {
                return {
                    ...prevState,
                    products: products
                }
            });
        } catch (err: any) {
            set((prevState)=>{
                return {
                    ...prevState,
                    errorMessage: err.message
                }
            })
            throw err
        }
    },
    fetchProductById: async (id: string) => {
        try {
            const product = await getProductById(id);
            set((prevState) => {
                return {
                    ...prevState,
                    product: product
                }
            });
        } catch (err: any) {
            set((prevState)=>{
                return {
                    ...prevState,
                    errorMessage: err.message
                }
            })
            throw err
        }
    },
    likeProduct: async (productId: string) => {
        try {
            await likeProductById(productId);
        } catch (err: any) {
            set((prevState)=>{
                return {
                    ...prevState,
                    errorMessage: err.message
                }
            })
            throw err
        }
    },
    unlikeProduct: async (productId: string) => {
        try {
            await unlikeProductById(productId);
        } catch (err: any) {
            set((prevState)=>{
                return {
                    ...prevState,
                    errorMessage: err.message
                }
            })
            throw err
        }
    }
}));