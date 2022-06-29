import type { NextPage } from "next";
import { Pagination, Stack, Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks";
import { FullScreenLoading } from "../components/ui";
import { useState } from "react";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products");
  const [contador, setContador] = useState(1);
  const [page,setPage ]= useState(0);
  const [page1,setPage1] = useState(1);

  const next = ()=>{
        if(products.length > page + 18){
            setPage(prev=>prev+18);
        }
    }
    const prev = ()=>{
        if(0 < page){
            setPage(pre=>pre-18);
        }
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {        
      setPage1(value);
      if(contador < value) {
          let count = value - contador
          while(count > 0){
              next()
              count--
          }
      }
      else if (contador > value){
          let count = contador - value
          while(count > 0){
              prev()
              count--
          }
      }
      setContador(value);
    };
  return (
    <ShopLayout
      title={"Teslo-Shop - Home"}
      pageDescription={"Encuentra los mejores productos de Teslo aquí"}>
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products.slice(page, page + 18) as any} />
      )}
      <br />
      <Stack sx={{textAlign:'center'}} spacing={2}>
            <Pagination sx={{alignSelf:"center"}} variant="outlined" size="large" color="secondary" count={Math.ceil(products.length / 18)}  page={page1} onChange={handleChange}/>
            <Typography>Pagina: {page1} de {Math.ceil(products.length / 18)}</Typography>
        </Stack>
    </ShopLayout>
  );
};
export default HomePage;