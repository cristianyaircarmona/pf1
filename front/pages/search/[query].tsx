import type { NextPage, GetServerSideProps,GetStaticPaths,GetStaticProps } from 'next';
import { Typography,Box } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { IProduct } from '../../interfaces';
import { dbProducts } from '../../database';


interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

    return (
        <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
            <Typography variant='h1' component='h1'>Buscar productos</Typography>
            {
                foundProducts 
                    ? <Typography variant='h2' sx={{ mb: 1 }} textTransform="capitalize">Tu búsqueda: { query }</Typography>
                    : (<>
                        <Box display='flex'>
                            <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún produto</Typography>
                            <Typography variant='h2' sx={{ ml: 1 }} color="secondary" textTransform="capitalize">{ query }</Typography>
                        </Box>
                        <Box display='flex'>
                            <Typography variant='h2' sx={{ mb: 1 }}>Productos sugeridos: </Typography>
                        </Box>
                            
                        </>)
            }
            <ProductList products={ products } />
        </ShopLayout>
    )
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query = '' } = params as { query: string };

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    // y no hay productos
    let products = await dbProducts.getProductsByTerm( query );
    const foundProducts = products.length > 0;

    // TODO: retornar otros productos
    if ( !foundProducts ) {
        // products = await dbProducts.getAllProducts(); 
        products = await (await dbProducts.getProductsByTerm('videojuegos')).slice(0,6);
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}



/*
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query = '' } = params as { query: string };

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }
    let find  = query.toString().toLowerCase();
    let response = await fetch('https://globalmarkets.herokuapp.com/products').then(res=>res.json());
    let products = response.filter((i:any)=>{
        let tag = Array.isArray(i.tags)? i.tags[0] : i.tags
        if(i.title.toLowerCase().includes(find)) return i;
        else if(i.description.toLowerCase().includes(find)) return i;
        else if(!!i.slug && i.slug.toLowerCase().includes(find)) return i;
        else if(!!i.tags && tag.toLowerCase().includes(find)) return i;
        else if(!!i.gender && i.gender.toLowerCase().includes(find)) return i;
        else if(!!i.types && i.types.toLowerCase().includes(find))return i;
        else if(!!i.caterogiras && i.caterogiras.length > 0 && i.caterogiras[0].toLowerCase().includes(find)) return i
    })   
    const foundProducts = products.length > 0;
    if(!foundProducts){

        let data = await fetch("https://globalmarkets.herokuapp.com/products").then(res=>res.json());
        return {
            props: {
                products:data.slice(0,15),
                foundProducts,
                query
            }
        }
    }
    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
    
}
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
    const productSlugs = await fetch("https://globalmarkets.herokuapp.com/products").then(res=>res.json());
  
  
    
    return {
      paths: productSlugs.map( (i:any) => ({
        params: {
          slug : i._id? `${i._id}` : `${i.slug}`
        }
      })),
      fallback: 'blocking'
    }
  }

export const getStaticProps: GetStaticProps = async ({ params }) => {
  
    const { slug = '' } = params as { slug: string };
    const prueba = await fetch(`https://globalmarkets.herokuapp.com/products`).then(res=>res.json());
    const product = prueba.filter((i)=>{
      if(i._id == slug) return i
      else if (i.slug == slug) return i
    })
    if ( !product[0] ) {
      
      return {
        redirect: {
          destination: '/cart',
          permanent: false
        }
      }
    }
    
    return {
      
      props: {
        product
      }
    }
  }
  */
export default SearchPage;
