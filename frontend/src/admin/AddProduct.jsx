import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextInput,
  FloatingLabel,
  Label,
  Textarea,
  Button,
  Toast,
} from "flowbite-react";
import Card from "../components/Card";
import CardHorizontal from "../components/CardHorizontal";
import { HiExclamation } from "react-icons/hi";
import { createProduct, reset } from "../store/product/productSlice";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    title: "",
    price: "",
    inStock: "",
    description: "",
    category: "",
  });
  const [errmsg, setErrmsg] = useState("");

  const {
    products,
    isAddProductLoading: isLoading,
    isAddProductError: isError,
    isAddProductSuccess: isSuccess,
    isAddProductMessage: message,
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const { imageUrl, title, price, inStock, description, category } =
    productData;

  useEffect(() => {
    if (isError) {
      setErrmsg(message);
    }

    if (isSuccess) {
      setProductData({
        imageUrl: "",
        title: "",
        price: "",
        inStock: "",
        description: "",
        category: "",
      });

      console.log("success");
    }

    dispatch(reset());
  }, [products, isError, isSuccess, message, dispatch]);

  const onProductChange = (e) => {
    setProductData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onProductSubmit = (e) => {
    e.preventDefault();

    if (
      !imageUrl ||
      !title ||
      !price ||
      !inStock ||
      !description ||
      !category
    ) {
      return setErrmsg("Please enter all fields");
    }

    if (title.length < 3) {
      return setErrmsg("title must contain atleast 5 characters");
    }
    if (category.length < 3) {
      return setErrmsg("category must contain atleast 3 characters");
    }

    if (description.length < 200) {
      return setErrmsg("Description must contain atleast 200 characters");
    }

    const productData = {
      imageUrl,
      title,
      price,
      inStock,
      description,
      category,
    };

    console.log(productData);

    dispatch(createProduct(productData));
  };

  return (
    <div>
      <h5 className="my-2 text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        ADD PRODUCT
      </h5>
      <div className="md:flex m-2 items-center">
        {/* cards */}

        <div className="md:flex md:w-2/3 gap-1 items-center m-1">
          <div className="md:w-2/3">
            <CardHorizontal {...productData} />
          </div>

          <div className="md:w-1/3 mx-auto">
            <Card
              imageUrl={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQv3Nm0RPRzw3HlyolAjf_3uyZ4NZ04g7Nvk96IODQC7h_nrFKY0BSirtw6dobSoqyqYc&usqp=CAU"
              }
              {...productData}
            />
          </div>
        </div>

        {/* form */}
        <div className="border-2 md:w-1/3 p-2 m-1">
          <h5 className="my-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Product Details
          </h5>
          <form>
            {errmsg && (
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                  <HiExclamation className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{errmsg}</div>
                <Toast.Toggle onDismiss={() => setErrmsg("")} />
              </Toast>
            )}
            <FloatingLabel
              name="imageUrl"
              variant="filled"
              label="Image URL"
              onChange={onProductChange}
              value={imageUrl}
              required
            />
            <FloatingLabel
              name="title"
              variant="filled"
              label="Title"
              onChange={onProductChange}
              value={title}
              required
            />
            <FloatingLabel
              name="category"
              variant="filled"
              label="Category"
              onChange={onProductChange}
              value={category}
              required
            />
            <TextInput
              type="number"
              placeholder="Price"
              required
              className="my-2"
              name="price"
              onChange={onProductChange}
              value={price}
            />
            <TextInput
              type="number"
              placeholder="In Stock"
              required
              className="my-2"
              name="inStock"
              onChange={onProductChange}
              value={inStock}
            />
            {/* <FloatingLabel variant="filled" label="Label" /> */}
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Product Description" />
              </div>
              <Textarea
                id="comment"
                placeholder="Product Description..."
                required
                rows={4}
                name="description"
                onChange={onProductChange}
                value={description}
              />
            </div>
            <Button type="submit" className="my-2" onClick={onProductSubmit}>
              ADD PRODUCT
            </Button>
          </form>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default AddProduct;
