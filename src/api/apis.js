import api from "./index";
import baseUrl from "./config";
import { csrfCookie } from "./index";

const apis = {
  get: {
    getAuthenticatedUser: () =>
      api({
        method: "GET",
        url: `${baseUrl}/api/user`,
      }),
    getSearchedPosts: (query = "", category_id = null, page = 1) =>
      api({
        method: "GET",
        url: `${baseUrl}/api/search/${
          query && category_id
            ? `?search=${query}&category_id=${category_id}&page=${page}`
            : query && !category_id
            ? `?search=${query}&page=${page}`
            : `?page=${page}`
        }`,
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
    getCommentsByPostId: (postId) =>
      api({
        method: "GET",
        url: `${baseUrl}/api/comments/${postId}`,
      }),
  },
  put: {},
  post: {
    updateUser: (userData) =>
      api({
        method: "POST",
        url: `${baseUrl}/api/user`,
        data: userData,
      }),
    createPost: (postData) => {
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
    commentOnPost: (commentData, postId) =>
      api({
        method: "POST",
        url: `${baseUrl}/api/comment/${postId}`,
        data: commentData,
      }),
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
