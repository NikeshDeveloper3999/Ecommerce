import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from "react-toastify";


const Add = ({token}) => {

  // ================= IMAGES =================
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
const [formKey, setFormKey] = useState(Date.now());

  // ================= BASIC INFO =================
  const [productCode, setProductCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
const [category, setCategory] = useState("");
const [subCategory, setSubCategory] = useState("");

  // ================= PRICING =================
  const [mrp, setMrp] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  // ================= SIZE =================
  const [sizes, setSizes] = useState([]);

  // ================= INVENTORY =================
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [bestseller, setBestseller] = useState(false);

  // ================= EXTRA DETAILS =================
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState("");
  const [brand, setBrand] = useState("");

  // ================= RETURN =================
  const [returnType, setReturnType] = useState("Exchange");
  const [warranty, setWarranty] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");

  // ================= MORE DETAILS =================
  const [buyLimit, setBuyLimit] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [terms, setTerms] = useState("");
  const [emiAvailable, setEmiAvailable] = useState(false);



useEffect(() => {
  setSizes([]);
}, [category, subCategory]);


  // ================= SUBMIT HANDLER =================
  const onsubmitHandler = async (e) => {
  e.preventDefault();


  

  try {
    const formData = new FormData();

    formData.append("product_code", productCode);
    formData.append("product_name", name);
    formData.append("product_description", description);
    formData.append("product_category", category);
    formData.append("product_subcategory", subCategory);

    formData.append("product_mrp", Number(mrp));
    formData.append("product_discount", Number(discount));
    formData.append("product_discount_price", Number(finalPrice));

    formData.append("product_size", JSON.stringify(sizes));
    formData.append("product_quantity", Number(quantity));
    formData.append("product_color", JSON.stringify(color.split(",")));
    formData.append("product_material", JSON.stringify(material.split(",")));
    formData.append("product_weight", JSON.stringify(weight.split(",")));
    formData.append("product_brand_name", brand);

    formData.append("product_return_type", returnType);
    formData.append("product_warranty", warranty);
    formData.append("product_return_policy", returnPolicy);

    formData.append("product_buy_limit", Number(buyLimit));
    formData.append("product_expected_delivery_date", deliveryDate);
    formData.append("product_terms_conditions", terms);

    formData.append("product_emi_availability", emiAvailable);
    formData.append("bestseller", bestseller);

    // Images (backend must handle 'product_image' array)
image1 && formData.append("image1", image1);
image2 && formData.append("image2", image2);
image3 && formData.append("image3", image3);
image4 && formData.append("image4", image4);
    const response = await axios.post(
      `${backendUrl}/api/product/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      
    // Reset all states here
  setProductCode("");
  setName("");
  setDescription("");

  setMrp("");
  setDiscount("");
  setFinalPrice("");

  setSizes([]);

  setQuantity("");
  setColor("");
  setBestseller(false);

  setMaterial("");
  setWeight("");
  setBrand("");

  setReturnType("Exchange");
  setWarranty("");
  setReturnPolicy("");

  setBuyLimit("");
  setDeliveryDate("");
  setTerms("");
  setEmiAvailable(false);
  setCategory("");
  setSubCategory("");
  setImage1(null);
  setImage2(null);
  setImage3(null);
  setImage4(null);

setFormKey(Date.now());

  } else {
      toast.error(response.data.message); 
    }

    
const getAllowedSizes = () => {
  if (category === "Kids") {
    return ["2","4","6","8","10","12","14"];
  }

  if (subCategory === "Topwear") {
    return ["S","M","L","XL","XXL"];
  }

  if (subCategory === "Bottomwear") {
    if (category === "Women") {
      return ["26","28","30","32","34","36"];
    }
    if (category === "Men") {
      return ["28","30","32","34","36"];
    }
  }

  return [];
};



if (!category || !subCategory) {
  toast.error("Please select category & subcategory");
  return;
}

const allowedSizes = getAllowedSizes();

if (sizes.length === 0) {
  toast.error("Please select at least one size");
  return;
}

const invalidSizes = sizes.filter(size => !allowedSizes.includes(size));

if (invalidSizes.length > 0) {
  toast.error(`Invalid sizes: ${invalidSizes.join(", ")}`);
  return;
}





  } catch (error) {
    console.error(error);

    toast.error(error.response?.data?.message || error.message);
  }
};
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <form onSubmit={onsubmitHandler} key={formKey}  className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-6">
        
        {/* ================= IMAGE UPLOAD ================= */}
<div>
  <p className="mb-2">Upload Image</p>
  <div className="flex gap-3">

    {/* IMAGE 1 */}
    <label htmlFor="image1">
      <img
        className="w-20 h-20 object-cover cursor-pointer border"
        src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
        alt="upload"
      />
      <input
        type="file"
        id="image1"
        hidden
        onChange={(e) => setImage1(e.target.files[0])}
      />
    </label>

    {/* IMAGE 2 */}
    <label htmlFor="image2">
      <img
        className="w-20 h-20 object-cover cursor-pointer border"
        src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
        alt="upload"
      />
      <input
        type="file"
        id="image2"
        hidden
        onChange={(e) => setImage2(e.target.files[0])}
      />
    </label>

    {/* IMAGE 3 */}
    <label htmlFor="image3">
      <img
        className="w-20 h-20 object-cover cursor-pointer border"
        src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
        alt="upload"
      />
      <input
        type="file"
        id="image3"
        hidden
        onChange={(e) => setImage3(e.target.files[0])}
      />
    </label>

    {/* IMAGE 4 */}
    <label htmlFor="image4">
      <img
        className="w-20 h-20 object-cover cursor-pointer border"
        src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
        alt="upload"
      />
      <input
        type="file"
        id="image4"
        hidden
        onChange={(e) => setImage4(e.target.files[0])}
      />
    </label>

  </div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* CATEGORY SELECT */}
  <select
    value={category}
    onChange={(e) => {
      setCategory(e.target.value);
    }}
    className="border px-3 py-2 rounded-md"
  >
    <option value="">Select Category</option>
    <option value="Men">Men</option>
    <option value="Women">Women</option>
    <option value="Kids">Kids</option>
  </select>


  <select
    value={subCategory}
    onChange={(e) => setSubCategory(e.target.value)}
    className="border px-3 py-2 rounded-md"
  >
    <option value="">Select Subcategory</option>
        <option value="Topwear">Topwear</option>
        <option value="Bottomwear">Bottomwear</option>
        <option value="Footwear">Footwear</option>
        <option value="Accessories">Accessories</option>
  </select>
</div>







        {/* ================= BASIC INFO ================= */}
        <input
          type="text"
          placeholder="Product Code"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          className="border px-3 py-2 rounded-md"
          required
        />

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />

        {/* ================= PRICING ================= */}
        <div className="grid grid-cols-3 gap-4">
          <input type="number" placeholder="MRP" value={mrp} onChange={(e)=>setMrp(e.target.value)} className="border px-3 py-2 rounded-md"/>
          <input type="number" placeholder="Discount %" value={discount} onChange={(e)=>setDiscount(e.target.value)} className="border px-3 py-2 rounded-md"/>
          <input type="number" placeholder="Final Price" value={finalPrice} onChange={(e)=>setFinalPrice(e.target.value)} className="border px-3 py-2 rounded-md"/>
        </div>

        {/* ================= SIZE ================= */}
        <div>
          <p className="mb-2">Product Size</p>
          <div className="flex gap-2">

              {getAllowedSizes().map(size => (
              <div
                key={size}
                onClick={() =>
                  setSizes(prev =>
                    prev.includes(size)
                      ? prev.filter(item => item !== size)
                      : [...prev, size]
                  )
                }
              >
                <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
                  {size}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* ================= INVENTORY ================= */}
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className="border px-3 py-2 rounded-md"/>
        <input type="text" placeholder="Colors (Red,Blue)" value={color} onChange={(e)=>setColor(e.target.value)} className="border px-3 py-2 rounded-md"/>

        <div className="flex items-center gap-2">
          <input type="checkbox" checked={bestseller} onChange={()=>setBestseller(prev=>!prev)} />
          <label>Add to Bestseller</label>
        </div>

        {/* ================= EXTRA ================= */}
        <input type="text" placeholder="Material" value={material} onChange={(e)=>setMaterial(e.target.value)} className="border px-3 py-2 rounded-md"/>
        <input type="text" placeholder="Weight" value={weight} onChange={(e)=>setWeight(e.target.value)} className="border px-3 py-2 rounded-md"/>
        <input type="text" placeholder="Brand" value={brand} onChange={(e)=>setBrand(e.target.value)} className="border px-3 py-2 rounded-md"/>

        {/* ================= RETURN ================= */}
        <select value={returnType} onChange={(e)=>setReturnType(e.target.value)} className="border px-3 py-2 rounded-md">
          <option value="Exchange">Exchange</option>
          <option value="Return">Return</option>
          <option value="No Return">No Return</option>
        </select>

        <input type="text" placeholder="Warranty" value={warranty} onChange={(e)=>setWarranty(e.target.value)} className="border px-3 py-2 rounded-md"/>
        <textarea placeholder="Return Policy" value={returnPolicy} onChange={(e)=>setReturnPolicy(e.target.value)} className="border px-3 py-2 rounded-md"/>

        {/* ================= MORE ================= */}
        <input type="number" placeholder="Buy Limit" value={buyLimit} onChange={(e)=>setBuyLimit(e.target.value)} className="border px-3 py-2 rounded-md"/>
        <input type="date" value={deliveryDate} onChange={(e)=>setDeliveryDate(e.target.value)} className="border px-3 py-2 rounded-md"/>
        <textarea placeholder="Terms & Conditions" value={terms} onChange={(e)=>setTerms(e.target.value)} className="border px-3 py-2 rounded-md"/>

        <div className="flex items-center gap-2">
          <input type="checkbox" checked={emiAvailable} onChange={()=>setEmiAvailable(prev=>!prev)} />
          <label>EMI Available</label>
        </div>

        <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg">
          Add Product
        </button>

      </form>
    </div>
  );
};

export default Add;