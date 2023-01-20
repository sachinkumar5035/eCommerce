import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getProductDetails, clearErrors, getAdminProducts } from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellCheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar.js";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant";
import { Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";



const UpdateProduct = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const navigate = useNavigate();
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.deleteProduct); // from store 
    const { product, error } = useSelector((state) => state.productDetails);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "Smartphone",
    ];
    const productId = params.id;

    useEffect(() => {

        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        }
        else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }

        if (error) {
            alert.error(error);
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Product updated successfully");
            navigate("/admin/products"); // redirect to dashboard
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
        dispatch(getAdminProducts());
    }, [dispatch, error, updateError, alert, navigate, isUpdated, product, productId]);


    const updateProductSubmithandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);  // in product model s in stock in small letter
        images.forEach((image) => {
            myForm.append("images", image);
        })
        dispatch(updateProduct(productId, myForm)); //call action method to add a product
    }

    const updateProductImagesChange = (e) => {

        const files = Array.from(e.target.files);
        setImages([]); // empty the images array
        setImagesPreview([]); // empty the image preview array
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        });

    }



    return (

        <Fragment>
            <MetaData title="Update Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmithandler}
                    >
                        <h1>Update Product</h1>

                        <div>
                            <SpellCheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                value={price}
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                multiple
                                onChange={updateProductImagesChange}
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" />
                            ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>

    );
};

export default UpdateProduct;
