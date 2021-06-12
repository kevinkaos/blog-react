import api from "./index";
import baseUrl from "./config";
import { csrfCookie } from "./index";

const apis = {
  get: {
    getSearchedPosts: (query = null, page = 1) =>
      api({
        method: "GET",
        url: `${baseUrl}/api/search/${query}?page=${page}`,
      }),
    csrfCookie: () => csrfCookie(),
    getAllPosts: (page) =>
      api({
        method: "GET",
        url: `${baseUrl}/api/posts?page=${page}`,
      }),
    getPost: (postId) =>
      api({
        method: "GET",
        url: `${baseUrl}/api/post/${postId}`,
      }),
    getCategories: () =>
      api({
        method: "GET",
        url: `${baseUrl}/api/categories`,
      }),
    getPostsByCategoryId: (categoryId, page) =>
      api({
        method: "GET",
        url: `${baseUrl}/api/posts/category/${categoryId}?page=${page}`,
      }),
    getPostsByUserId: (userId, page) =>
      api({
        method: "GET",
        url: `${baseUrl}/api/posts/user/${userId}?page=${page}`,
      }),
  },
  put: {},
  post: {
    setPost: (postData) => {
      return api({
        method: "POST",
        url: `${baseUrl}/api/post`,
        data: postData,
      });
    },
    updatePost: (postData, postId) => {
      return api({
        method: "POST",
        url: `${baseUrl}/api/post/${postId}`,
        data: postData,
      });
    },
    register: (registrationData) => {
      return api({
        method: "POST",
        url: `${baseUrl}/api/register`,
        data: registrationData,
      });
    },
    login: (loginData) => {
      return api({
        method: "POST",
        url: `${baseUrl}/api/login`,
        data: loginData,
      });
    },
    logout: () => {
      return api({
        method: "POST",
        url: `${baseUrl}/api/logout`,
      });
    },
  },
  delete: {
    deletePost: (postId) =>
      api({
        method: "DELETE",
        url: `${baseUrl}/api/post/${postId}`,
      }),
  },
};

export default apis;
