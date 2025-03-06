import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { decrement, increment } from "./counterReducer";

export default function ContactPage() {

  const {data} = useAppSelector(state=>state.counter);

  const dispatch = useAppDispatch();
  return (
    <>
    <Typography variant="h2">
      Contact Page
    </Typography>
    <Typography variant="body1">
      The data is:{data}
    </Typography>
    <ButtonGroup>
      <Button onClick={()=>dispatch(decrement(1))} color="error">Decrement</Button>
      <Button onClick={()=>dispatch(increment(1))} color="secondary">Increment</Button>
      <Button onClick={()=>dispatch(decrement(5))} color="secondary">decrement 5</Button>
    </ButtonGroup>  
    </>
  )
}