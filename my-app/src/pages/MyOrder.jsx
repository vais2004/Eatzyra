import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MyOrder() {
  const {orderData,setOrderData}=useState("")
  return (
    <div>
      <Header />
      <div className="container py-3">
        <div className="row">
          {orderData !== {} ? Array (orderData).map(data=>{
            return(data.orderData?
              data.orderData.order_data.slice(0).reverse().map((item)=>{
                return(
                  item.map((arrayData)=>{
                    return(
                      <div>
                        {arrayData.Order_date ? <div className="m-auto mt-5">
                          {data= arrayData.Order_date}
                          <hr/>
                        </div>:
                        <div className="col-12 col-md-6 col-lg-3">
                          <div className=" card mt-3" style={{width:"16rem", mexHeight:"360px"}}>
                            <img src={arrayData.img} className="card-img-top" alt="foodItem"/>
                          <div className="card-body">
                            <h5 className="card-title">{arrayData.name}</h5>
                            <div className="container w-100 p-0" style={{height:"38px"}}>
                              <span className="m-1">{arrayData.size}</span>
                              <span className="m-1">{arrayData.quantity}</span>
                              <span className="m-1">{data}</span>
                              <div className="d-inline ms-2 h-100 w-20 fs-5">
                                ₹{arrayData.price}/-
                            </div>
                            </div>
                            </div>

                          </div>


                        </div>
                                       
                        
                                            
                        }
                      </div>
                    )
                  })
                )
              })
            )
          })}

        </div>
      </div>
      <Footer />
    </div>
  );
}
