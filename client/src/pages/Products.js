import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DistributorLayout from "../components/DistributorLayout";
import { fetchPrices } from "../redux/priceSlice";
import { useNavigate } from "react-router-dom";
function Products() {

  const dispatch = useDispatch();

  const { prices } =
    useSelector(
      (state) => state.prices
    );

  const [search, setSearch] =
    useState("");
    const navigate =
  useNavigate();

  useEffect(() => {

    dispatch(fetchPrices());

  }, [dispatch]);

  const filteredProducts =
    prices.filter((p) =>

      p.itemId?.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  return (

    <DistributorLayout>

      <div className="products-header">

  <div>

    <h1>
      My Products
    </h1>

    <p>
      Manage your inventory
    </p>

  </div>

  <div className="products-actions">

    <input
      placeholder="Search Product..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

    <button
      className="btn-blue"
      onClick={() =>
        navigate(
          "/distributor/add-product"
        )
      }
    >
      + Add Product
    </button>

  </div>

</div>

      <div className="products-grid">

        {filteredProducts.map((p) => (

          <div
  key={p._id}
  className="inventory-card"
>

  <div className="inventory-left">

    <img
  src={
    p.itemId?.image ||
    "/images/product-placeholder.png"
  }
  alt={
    p.itemId?.name
  }
  className="inventory-image"
/>

  </div>

  <div className="inventory-right">

    <h2>
      {p.itemId?.name}
    </h2>

    <p>
      Category:
      {" "}
      {p.itemId?.category}
    </p>

    <p>
      Distributor Price:
      ₹{p.price}
    </p>

    <p>
      MRP:
      ₹{p.itemId?.mrp}
    </p>

    <p>
      Stock:
      {p.itemId?.quantity}
    </p>

    <div className="inventory-actions">

      <button
        className="btn-edit"
      >
        Edit Product
      </button>

      <button
        className="btn-remove"
      >
        Delete Product
      </button>

    </div>

  </div>

</div>

        ))}

      </div>

    </DistributorLayout>

  );

}

export default Products;