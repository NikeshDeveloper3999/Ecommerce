import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../Context/Shopcontext'
import Title from '../Componets/Title'
import axios from 'axios'

const Orders = () => {

  const { backendURL, currency, Token } = useContext(Shopcontext)

  const [orderData, setorderData] = useState([])

  const loadorderData = async () => {

    try {

      if (!Token) return

      const response = await axios.post(
        backendURL + "/api/order/userOrders",
        {},
        {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }
      )

      if (response.data.success) {

        let allorderItem = []

        response.data.orders.map((order) => {

          order.items.map((item) => {

            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date

            allorderItem.push(item)

          })

        })

        setorderData(allorderItem.reverse())

      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    loadorderData()
  }, [Token])

  return (

    <div className='border-t pt-16'>

      <div className="text-2xl mb-8">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {orderData.length === 0 ? (

        <p>No orders placed yet.</p>

      ) : (

        orderData.map((item, index) => (

          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >

            {/* LEFT SECTION */}
            <div className="flex items-start gap-6">

              <img
                src={item.product_image[0]}
                alt=""
                className="w-16 sm:w-20"
              />

              <div>

                <p className="text-sm font-medium">
                  {item.product_name}
                </p>

                <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">

                  <p>
                    {currency}{item.product_discount_price}
                  </p>

                  <p> 
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Size: {item.size}
                  </p>

                </div>

                <p className="text-sm text-gray-500 mt-2">

                  Date:{" "}
                  {new Date(item.date).toDateString()}

                </p>

              </div>

            </div>

            {/* RIGHT SECTION */}

            <div className="flex items-center gap-4">

              <div className="flex items-center gap-2">

                <span className="min-w-2 h-2 rounded-full bg-green-500"></span>

                <p className="text-sm md:text-base">
                  {item.status || "Ready to ship"}
                </p>

              </div>
            </div>

<div className=" flex items-center gap-4">

              <button onClick={loadorderData} className="border px-2 py-2 text-sm font-medium rounded-sm hover:bg-gray-100">
 
                Track Order

              </button>

</div>

          </div>

        ))

      )}

    </div>

  )

}

export default Orders