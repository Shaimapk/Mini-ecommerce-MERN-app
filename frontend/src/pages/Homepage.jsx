import ProductList from "../components/ProductList";

export default function Homepage() {
  return (
    <div className="p-4">

      <div className="flex gap-4 items-center justify-between">
        <input type="text" placeholder="search here..." className="border corder-gray-300 rounded-md px-4 py-2"/>
        <select name="category">
          <option value="">Category</option>
          <option value="electronics">Fashion</option>
          <option value="fashion">Electronics</option>
          <option value="books">Books</option>
        </select>
          <select name="sort">
            <option value="">Sort by:</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
      </div>
      
      <ProductList />
    </div>
  )
}
