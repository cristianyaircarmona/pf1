import { db } from "./";
import * as models from "../models";
import { IProduct } from "../interfaces";

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await models.Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}
export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await models.Product.find().select("slug -_id").lean();
  await db.disconnect();

  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  term = term.toString().toLowerCase();
  
    let response = await fetch('https://globalmarkets.herokuapp.com/products').then(res=>res.json());
    let products = response.filter((i:any)=>{
        let tag = Array.isArray(i.tags)? i.tags[0] : i.tags
        if(i.title.toLowerCase().includes(term)) return i;
        else if(i.description.toLowerCase().includes(term)) return i;
        else if(!!i.slug && i.slug.toLowerCase().includes(term)) return i;
        else if(!!i.tags && tag.toLowerCase().includes(term)) return i;
        else if(!!i.gender && i.gender.toLowerCase().includes(term)) return i;
        else if(!!i.types && i.types.toLowerCase().includes(term))return i;
        else if(!!i.caterogiras && i.caterogiras.length > 0 && i.caterogiras[0].toLowerCase().includes(term)) return i
    })


    
    return products;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();
  const products = await models.Product.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(products));
};
