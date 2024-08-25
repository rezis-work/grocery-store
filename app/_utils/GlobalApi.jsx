const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((res) => {
    return res.data.data;
  });

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => {
    return res.data.data;
  });

const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => res.data.data);

const getProductsByCategory = (category) =>
  axiosClient
    .get(`/products?filters[categories][name][$in]=${category}&populate=*`)
    .then((res) => res.data.data);

const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const signIn = (email, password) =>
  axiosClient.post("auth/local", {
    identifier: email,
    password: password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItem = (userId, jwt) =>
  axiosClient
    .get(
      `/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate][0]=url
`,
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      const cartItemlist = data.map((item) => {
        return {
          name: item.attributes.products?.data[0].attributes.name,
          quantity: item.attributes.quantity,
          amount: item.attributes.amount,
          image:
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            item.attributes.products.data[0].attributes.images.data[0]
              .attributes.url,
          actualPrice: item.attributes.products?.data[0].attributes.mrp,
          id: item.id,
          products: item.attributes.products?.data[0].id,
        };
      });
      return cartItemlist;
    });

const deleteCartItem = (id, jwt) =>
  axiosClient.delete("/user-carts/" + id, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const createOrder = (data, jwt) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getMyOrder = (userId, jwt) =>
  axiosClient
    .get(
      `/orders?filters[userId][$eq]=${userId}&populate[orderItemList][populate][product][populate][images]=url`,
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((res) => {
      const response = res.data.data;
      console.log(response);
      const orderList = response.map((item) => ({
        id: item.id,
        totalOrderAmount: item.attributes.totalOrderAmount,
        paymentId: item.attributes.paymentId,
        orderItemList: item.attributes.orderItemList,
        createdAt: item.attributes.createdAt,
      }));

      return orderList;
    });

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  signIn,
  addToCart,
  getCartItem,
  deleteCartItem,
  createOrder,
  getMyOrder,
};
