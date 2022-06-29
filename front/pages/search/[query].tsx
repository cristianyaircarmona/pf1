import type { NextPage, GetServerSideProps,GetStaticPaths,GetStaticProps } from 'next';
import { dbProducts } from '../../database';
import SearchPage1 from '../../components/products/Search';
import { useProducts } from '../../hooks';


interface Props {
    query: string;
};

const SearchPage: NextPage<Props> = ({query}) => {
    const {products} = useProducts('/products');
    const prueba = ()=>{
        const res = products.filter((i:any)=>{
            let tag = Array.isArray(i.tags)? i.tags[0] : i.tags
        if(i.title.toLowerCase().includes(query)) return i;
        else if(i.description.toLowerCase().includes(query)) return i;
        else if(!!i.slug && i.slug.toLowerCase().includes(query)) return i;
        else if(!!i.tags && tag.toLowerCase().includes(query)) return i;
        else if(!!i.gender && i.gender.toLowerCase().includes(query)) return i;
        else if(!!i.types && i.types.toLowerCase().includes(query))return i;
        else if(!!i.caterogiras && i.caterogiras.length > 0 && i.caterogiras[0].toLowerCase().includes(query)) return i
        });
        const ver = res.length > 0
        if(!ver){
            return {
                productos: products.filter((i:any)=>{
                    let tag = Array.isArray(i.tags)? i.tags[0] : i.tags
                if(i.title.toLowerCase().includes("juegos")) return i;
                else if(i.description.toLowerCase().includes("juegos")) return i;
                else if(!!i.slug && i.slug.toLowerCase().includes("juegos")) return i;
                else if(!!i.tags && tag.toLowerCase().includes("juegos")) return i;
                else if(!!i.gender && i.gender.toLowerCase().includes("juegos")) return i;
                else if(!!i.types && i.types.toLowerCase().includes("juegos"))return i;
                else if(!!i.caterogiras && i.caterogiras.length > 0 && i.caterogiras[0].toLowerCase().includes("juegos")) return i
                }),
                ver
            }
        }
        return {
            productos:res,
            ver
        }
    };
    
    return (
        <SearchPage1 query={query} products={prueba().productos} foundProducts={prueba().ver} />
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
    return {
        props: {
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
  */
 
 /*
export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const productSlugs = await fetch("https://globalmarkets.herokuapp.com/products").then(res=>res.json());
        return {
            paths: productSlugs.map( (i:any) => ({
                params: {
                query :`${i.title} ${i.slug} ${i.description} ${i.type} ${i.gender}`
            }
            })),
            fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { query = '' } = params as { query: string };
    const prueba = await fetch(`https://globalmarkets.herokuapp.com/products`).then(res=>res.json());
    const product = prueba.filter((i)=>{
      if(i._id == query) return i
      else if (i.slug == query) return i
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
    console.log("esto es products back", products);
    
    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}
*/
export default SearchPage;
