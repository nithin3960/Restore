import {Grid} from "@mui/material";
import { Product } from "../../app/layout/models/Product"
import ProductCard from "./ProductCard";

type Props= {
    products: Product[];

}

export default function ProductList({products}: Props) {
  return (
    <Grid container spacing={3}>
  {products.map(product => (
    <Grid item xs={3} key={product.id}>
      <ProductCard product={product} />
    </Grid>
  ))}
</Grid>
  )
}