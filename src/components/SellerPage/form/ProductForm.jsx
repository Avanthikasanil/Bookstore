// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import axios from "axios";

// function ProductForm({ modalStatus, setShowModal, products, setProducts }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     price: "",
//     description: "",
//     image: null, // ✅ file object, not string
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");

//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("author", formData.author);
//       data.append("price", formData.price);
//       data.append("description", formData.description);
//       if (formData.image) {
//         data.append("image", formData.image); // ✅ MUST be "image"
//       }

//       const res = await axios.post("http://localhost:4000/books/add", data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // add the saved book to list
//       setProducts((prev) => [...prev, res.data.book]);

//       // reset form + close modal
//       setFormData({
//         title: "",
//         author: "",
//         price: "",
//         description: "",
//         image: null,
//       });
//       setShowModal(false);
//     } catch (err) {
//       console.error("Failed to add book:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Failed to add book");
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group className="mb-3">
//         <Form.Label>Title</Form.Label>
//         <Form.Control
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Author</Form.Label>
//         <Form.Control
//           type="text"
//           name="author"
//           value={formData.author}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Price</Form.Label>
//         <Form.Control
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Description</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={3}
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//         />
//       </Form.Group>

//         <Form.Group className="mb-3">
//     <Form.Label>Book Cover</Form.Label>
//     <Form.Control
//       type="file"
//       name="image"   // must match backend
//       accept="image/*"
//       onChange={(e) =>
//         setFormData({ ...formData, image: e.target.files[0] })
//       }
//     />
//   </Form.Group>

//       <Button type="submit" variant="primary">Add Book</Button>
//     </Form>
//   );
// }

// export default ProductForm;


// ProductForm.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

function ProductForm({ modalStatus, setShowModal, products, setProducts }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      price: "",
      description: "",
      image: null, // file
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be positive")
        .required("Price is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.mixed().required("Book cover is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = localStorage.getItem("token");
        const data = new FormData();
        data.append("title", values.title);
        data.append("author", values.author);
        data.append("price", values.price);
        data.append("description", values.description);
        data.append("image", values.image);

        const res = await axios.post("http://localhost:4000/books/add", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Book added successfully!");
        setProducts((prev) => [...prev, res.data.book]);
        resetForm();
        setShowModal(false);
      } catch (err) {
        console.error("Failed to add book:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Failed to add book");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Title */}
      <div className="mb-3">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-danger">{formik.errors.title}</div>
        )}
      </div>

      {/* Author */}
      <div className="mb-3">
        <label>Author</label>
        <input
          type="text"
          name="author"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.author}
        />
        {formik.touched.author && formik.errors.author && (
          <div className="text-danger">{formik.errors.author}</div>
        )}
      </div>

      {/* Price */}
      <div className="mb-3">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price && (
          <div className="text-danger">{formik.errors.price}</div>
        )}
      </div>

      {/* Description */}
      <div className="mb-3">
        <label>Description</label>
        <textarea
          rows={3}
          name="description"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <div className="text-danger">{formik.errors.description}</div>
        )}
      </div>

      {/* Image */}
      <div className="mb-3">
        <label>Book Cover</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="form-control"
          onChange={(event) =>
            formik.setFieldValue("image", event.currentTarget.files[0])
          }
        />
        {formik.touched.image && formik.errors.image && (
          <div className="text-danger">{formik.errors.image}</div>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-100">
        Add Book
      </Button>
    </form>
  );
}

export default ProductForm;
