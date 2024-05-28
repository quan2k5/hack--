import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './bootstrap.min.css'
import ListProduct from './components/ListProduct'
import Cart from './components/Cart'
import { Value } from './components/Value'
const products=[
  {
    id:1,
    name:'Pizza',
    img:'https://media.istockphoto.com/id/1447172966/photo/tasty-pizza-with-mushroom-cheese-tomatoes-pepper-becon-sausage-fresh-salad-and-pesto.webp?b=1&s=170667a&w=0&k=20&c=QRN2inC_XgtuAO3WWtAcSCTlIInlzmBDoCkRQDtzsPU=',
    price:30,
    quantity:0,
    description:' Lorem ipsum dolor sit amet, consectetur adipisicingelit. At dicta asperiores veniam repellat unde debitisquisquam magnam magni ut deleniti!'
  },
  {
    id:2,
    name:'Hamburger',
    img:'https://media.istockphoto.com/id/1500141300/photo/bbq-classic-burger-against-fiery-flames-vibrant-food-black-background.webp?b=1&s=170667a&w=0&k=20&c=6cCdI32kPORZumfHMiPu_hr9YvtY1cWf5eCu8AFIqgc=',
    price:25,
    quantity:10,
    description:' Lorem ipsum dolor sit amet, consectetur adipisicingelit. At dicta asperiores veniam repellat unde debitisquisquam magnam magni ut deleniti!'
  },
  {
    id:3,
    name:'Bread',
    img:'https://media.istockphoto.com/id/1432301803/photo/sliced-bread-pain-de-mie-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=V3kBvaZx57ZDU0LeivcN0DSAFLY2ISpVefmwS-sl8Wg=',
    price:19,
    quantity:10,
    description:' Lorem ipsum dolor sit amet, consectetur adipisicingelit. At dicta asperiores veniam repellat unde debitisquisquam magnam magni ut deleniti!'
  },
  {
    id:4,
    name:'Cake',
    img:'https://media.istockphoto.com/id/1676097087/photo/pastel-de-tres-leches-three-milk-cake-latin-america-bakery-with-strawberries.webp?b=1&s=170667a&w=0&k=20&c=fafTp3QFmHBxk7OjEEhmAG3Q_4MQvAlwT2lk8lwcPIg=',
    price:37,
    quantity:10,
    description:' Lorem ipsum dolor sit amet, consectetur adipisicingelit. At dicta asperiores veniam repellat unde debitisquisquam magnam magni ut deleniti!'
  },
]
interface Product{
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
localStorage.setItem('products', JSON.stringify(products));
function App() {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const appear = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };
  const [show2,setShow2]=useState<boolean>(false);
  const appear1 = () => {
    setShow2(true);
    setTimeout(() => {
      setShow2(false);
    }, 2000);
  };
  const [show3,setShow3]=useState<boolean>(false);
  const appear2 = () => {
    setShow3(true);
    setTimeout(() => {
      setShow3(false);
    }, 2000);
  };
  const [productList,setProductList]=useState<Product[]>(function(){
    let productList: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    if(productList.length===0){
        return [];
    }
    return productList;
  });
  const [cartList,setCart]=useState<CartI[]>(function(){
    let cartList: CartI[] = JSON.parse(localStorage.getItem('carts') || '[]');
    if(cartList.length===0){
        return [];
    }
    return cartList;
  });
  const addProduct=(id:number)=>{
    let findItem:Product|undefined=productList.find(e=>{
        return e.id===id;
    })
    if(findItem){
        let find:CartI|undefined=cartList.find((e)=>{
            return e.id===findItem.id;
        })
        if(!find){
          appear();
            setCart(prevState=>{
                const list:CartI[]=[...prevState,{
                    name:findItem.name,
                    id:findItem.id,
                    img:findItem.img,
                    price:findItem.price,
                    number:1,
                    description:findItem.description,
                    quantity:findItem.quantity,
                }];
                localStorage.setItem('carts',JSON.stringify(list));
                return list;
            });
        }else{
          const index :number|undefined=cartList.findIndex(e=>{
            return e.id==find.id;
          })
        const newCart=[...cartList];
        if(newCart[index].quantity<newCart[index].number+1){
            alert('Số lương hàng trong kho đã hết');
            return;
        }
        newCart[index].number++;
        setCart(newCart);
        localStorage.setItem('carts',JSON.stringify(newCart));  
        }
    }
  }
  const handleClickRemove=(cartItem:CartI)=>{
    const newCart=cartList.filter((e)=>{
      return cartItem.id!=e.id;
    })
    appear2();
    setCart(newCart);
    localStorage.setItem('carts',JSON.stringify(newCart));
  }
  const MoneyCart=()=>{
    let cartMoney=0;
    cartList.forEach((e:CartI)=>{
        cartMoney+=e.number*e.price;
    })
    return cartMoney;
  }
const handleUpdateCart=(cartItem:CartI,input:any)=>{
  const index :number|undefined=cartList.findIndex(e=>{
      return e.id==cartItem.id;
  })
  const newCart=[...cartList];
  if(input>newCart[index].quantity){
    setCart(newCart);
    localStorage.setItem('carts',JSON.stringify(newCart));
    alert('Số lương hàng trong kho đã hết');
    return;
  }else if(input<=0){
    setCart(newCart);
    localStorage.setItem('carts',JSON.stringify(newCart));
    alert('Mời bạn đi ấn nút xóa bên cạnh');
    return;
  }
  newCart[index].number=input;
  appear1();
  setCart(newCart);
  localStorage.setItem('carts',JSON.stringify(newCart));
}
  return (
    <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className='row'>
          <ListProduct productList={productList}  carts={cartList} addProduct={addProduct} ></ListProduct>
          <Cart carts={cartList} onClickRemove={handleClickRemove} money={MoneyCart()} onClickUpdate={handleUpdateCart} value={showNotification} value2={show2} value3={show3}></Cart>
        </div>
    </div>
  )
}
export default App
