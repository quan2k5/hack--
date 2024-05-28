import React,{useState} from 'react'
import CartItem from './CartItem'
// import './Cart.css';
interface Cart{
    name:string,
    img:string,
    quantity:number,
    price:number,
    description:string,
    id:number,
    number:number
}
interface CartList{
    carts:Cart[],
    onClickRemove:any,
    onClickUpdate:any,
    money:number,
    value:boolean,
    value2:boolean,
    value3:boolean,
}
export default function Cart(Props:CartList){
    const check=():boolean=>{
        if(Props.carts.length==0){
            return false;
        }
        return true;
    }

  return (
    <div>
        {check()?
         <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
         <div className="panel panel-danger">
           <div className="panel-heading">
             <h1 className="panel-title">Your Cart</h1>
           </div>
           <div className="panel-body">
             <table className="table">
               <thead>
                 <tr>
                   <th style={{width:'4%'}}>STT</th>
                   <th>Name</th>
                   <th style={{width:'15%'}}>Price</th>
                   <th style={{width:'4%'}} >Quantity</th>
                   <th  style={{width:'25%'}} >Action</th>
                 </tr>
               </thead>
               <tbody id="my-cart-body">
               {Props.carts.map((e)=>{
                     return  <CartItem cartItem={e} onClickRemove={Props.onClickRemove} onClickUpdate={Props.onClickUpdate}></CartItem>
                 })}
               </tbody>
               <tfoot id="my-cart-footer">
                 <tr>
                   <td colSpan={4}>
                     There are <b>{Props.carts.length}</b> items in your shopping cart.
                   </td>
                   <td colSpan={2} className="total-price text-left">{Props.money}USD</td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>
         {Props.value && (
             <div className="alert alert-success" role="alert" id="mnotification">
                 Add to cart successful
             </div>
         )}
          {Props.value2 && (
             <div className="alert alert-success" style={{backgroundColor:'orange',color:'white'}} role="alert" id="mnotification">
                Update successful
             </div>
         )}
           {Props.value3 && (
             <div className="alert alert-success" style={{backgroundColor:'red', color:'white'}} role="alert" id="mnotification">
                DElete successful
             </div>
         )}

       </div>
        :<h4>Không có sản phẩm trong giỏ hàng</h4>}
    </div>
  )
  
}
