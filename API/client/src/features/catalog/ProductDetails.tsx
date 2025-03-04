import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../../app/layout/models/Product";
import { Button, CardMedia, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { Height, Label } from "@mui/icons-material";

export default function ProductDetails() {
  const{id} = useParams();
  const[product, setProduct]= useState<Product | null>(null);
 
  useEffect(()=> {
    fetch(`https://localhost:5001/api/products/${id}`)
    .then(response=>response.json())
    .then(data=>setProduct(data)).catch(Error=>console.log(Error))
  });

  if(!product){
   return <div>Loading...</div>
  }

  const ProductDetails =[
    {Label: 'Name', value: product.name},
    {Label: 'Description', value: product.description},
    {Label: 'Type', value: product.type},
    {Label: 'Brand', value: product.brand},
    {Label: 'Quantity in stock', value: product.quantityInStock},
  ]
  return (
    <Grid2 container spacing={6} maxWidth={'lg'} sx={{mx:'auto'}}>
      <Grid2 size={6}>
      <img src={product?.pictureUrl} alt={product.name} style={{width:'100%'}}></img>
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{product?.name}</Typography>
        <Divider sx={{mb:2}}/>
        <Typography variant="h4" color="secondary">${(product.price /100).toFixed(2)}</Typography>
        <TableContainer>
          <Table sx={{'&td' :{fontSize: '1rem'}}}>
          <TableBody>
            {ProductDetails.map((detail, index)=>(
               <TableRow key={index}>
                <TableCell sx={{fontWeight:'bold'}}>{detail.Label}</TableCell>
                <TableCell >{detail.value}</TableCell>
               </TableRow>

           ))}

          </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={3}>
          <Grid2 size={6}>
            <TextField variant="outlined"
            type="number"
            label= 'Quantity in the basket'
            fullWidth
            defaultValue={1}/>
          </Grid2>
          <Grid2 size={6}>
            <Button sx={{height:'55px'}} 
            color="primary" size="large" variant="contained" fullWidth> 
              Add to Basket
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>

    </Grid2>
  )
}