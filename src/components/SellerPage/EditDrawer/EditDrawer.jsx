
import React, { useEffect } from "react";
import axios from "../../../Utils/baseUrl";
import "./EditDrawer.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

function EditDrawer({ open, onClose, product, setProducts }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      price: "",
      description: "",
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.string().required("Image URL is required"),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return toast.error("Please login first");

        const res = await axios.put(
          `/sellers/${product._id}`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? res.data.book : p))
        );

        toast.success("Product updated successfully!");
        onClose();
      } catch (err) {
        console.error(err);
        if (err.response) {
          toast.error(err.response.data.message || "Failed to update product");
        } else {
          toast.error("Failed to update product");
        }
      }
    },
  });

  // 🔹 Pre-fill form when product changes
  useEffect(() => {
    if (product) {
      formik.setValues({
        title: product.title || "",
        author: product.author || "",
        price: product.price || "",
        description: product.description || "",
        image: product.image || "",
      });
    }
  }, [product]);

  if (!open) return null;

  return (
    <div className="drawer-overlay">
      <div className="drawer">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Edit Product</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-danger">{formik.errors.title}</div>
            )}
          </div>

          {/* Author */}
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.author && formik.errors.author && (
              <div className="text-danger">{formik.errors.author}</div>
            )}
          </div>

          {/* Price */}
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price && (
              <div className="text-danger">{formik.errors.price}</div>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows={3}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </div>

          {/* Image */}
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-danger">{formik.errors.image}</div>
            )}
          </div>

          <button type="submit" className="update-btn">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditDrawer;
