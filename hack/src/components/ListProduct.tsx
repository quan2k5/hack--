import React from 'react'
import Product from './Product'
interface ProductL{
    name:string,
    img:string,
    quantity:number,
    price:number,
    description:string,
    id:number,
}
interface CartI{
    name:string,
    img:string,
    quantity:number,
    price:number,
    description:string,
    id:number,
    number:number
}
interface Products{
    productList:ProductL[];
    addProduct:any;
    carts:CartI[];
}
export default function ListProduct(Props:Products) {
    const {productList}=Props;
    const {addProduct}=Props;
    const checkQuantity=(eb:ProductL)=>{
        const find=Props.carts.find(function(e){
            return e.id==eb.id;
        })
        if(find){
            return find.quantity-find.number;
        }
        return eb.quantity;
    }
  return (
    <div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">List Products</h1>
              </div>
              <div className="panel-body" id="list-product">
                {productList.map(function(e){
                    return <Product product={e} addProduct={()=>{addProduct(e.id)}} quantity={checkQuantity(e)} ></Product>
                })}  
              </div>
            </div>
          </div>
    </div>
  )
}
