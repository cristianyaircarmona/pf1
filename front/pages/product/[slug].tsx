import { useState, useContext } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { CartContext } from '../../context/cart/CartContext';

import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';

import {  ICartProduct, ISize } from '../../interfaces';


interface Props {
  product: any
}


const ProductPage:NextPage<Props> = (props) => {
  const router = useRouter();
  const { addProductToCart } = useContext( CartContext )
  
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id:   props.product[0]?._id,
    image: props.product[0]?.images ,
    price: props.product[0]?.price,
    size: undefined,
    slug:  props.product[0]?.slug,
    title: props.product[0]?.title,
    gender:props.product[0]?.gender,
    quantity: 1,
  }) 
  

  const selectedSize = ( size: ISize ) => {
    setTempCartProduct( currentproduct => ({
      ...currentproduct,
      size
    }));
  }

  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }


  const onAddProduct = () => {
    
    if(props.product[0].sizes.length < 1) {
      addProductToCart(tempCartProduct)
      router.push('/cart');
    }
    if ( !tempCartProduct.size ) { return; }
    addProductToCart(tempCartProduct);
    router.push('/cart');
  };
  

  
  return (
    <ShopLayout title={ props.product[0].title } pageDescription={ props.product[0].description }>
    
      <Grid container spacing={3}>

        <Grid item xs={12} sm={ 7 }>
          <ProductSlideshow 
            images={ props.product[0]?.images }
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 5 }>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Typography variant='h1' component='h1'>{ props.product[0].title }</Typography>
            <Typography variant='subtitle1' component='h2'>{ `$${props.product[0].price}` }</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter 
                currentValue={tempCartProduct.quantity}
                updatedQuantity={ onUpdateQuantity  }
                maxValue={ props.product[0].inStock > 10 ? 10: props.product[0].inStock }
              />
              {<SizeSelector 
                // selectedSize={ product.sizes[2] } 
                sizes={ props.product[0].sizes }
                selectedSize={ tempCartProduct.size }
                onSelectedSize={ selectedSize }
              />}

            </Box>


            {/* Agregar al carrito */}
            {
              (props.product[0].inStock > 0)
               ? (
                  <Button 
                    color="secondary" 
                    className='circular-btn'
                    onClick={ onAddProduct }
                  >
                    { props.product[0].sizes.length < 1? 'Agregar al carrito' : 
                        tempCartProduct.size
                        ? 'Agregar al carrito'
                        : 'Seleccione una talla'
                    }
                  </Button>
               )
               : (
                 <Chip label="No hay disponibles" color="error" variant='outlined' />
               )
            }
            
            {/* Descripción */}
            <Box sx={{ mt:3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{ props.product[0].description }</Typography>
            </Box>

          </Box>
        </Grid>


      </Grid>

    </ShopLayout>
  )
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



  export default ProductPage