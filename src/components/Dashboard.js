import React, { useEffect, useState } from "react";
import { Comment, List, Button, Pagination, Input } from "antd";
import moment from "moment";
// import Header from "./Header";
import apis from "../api/apis";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const { Search } = Input;
  const [allPosts, setAllPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [active, setActive] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [userId, setUserId] = useState(null);
  const [query, setQuery] = useState("");
  const history = useHistory();

  useEffect(() => {
    apis.get.getCategories().then((res) => {
      setCategories(res.data.data);
    });
    getAllPosts();
  }, []);

  const getSearchedPosts = (query, page = 1) => {
    apis.get.getSearchedPosts(query, categoryId, page).then((res) => {
      setAllPosts(res.data.data.data);
      setPagination(res.data.data);
      setActive("allSearchedPosts");
      setQuery("");
    });
  };

  const getAllPosts = (page = 1) => {
    apis.get.getAllPosts(page).then((res) => {
      setAllPosts(res.data.data.data);
      setPagination(res.data.data);
      setActive("allPosts");
      setCategoryId(null);
    });
  };

  const getPostsByCategory = (categoryId, page = 1) => {
    setCategoryId(categoryId);
    apis.get.getPostsByCategoryId(categoryId, page).then((res) => {
      setAllPosts(res.data.data.data);
      setPagination(res.data.data);
      setActive("allPostsByCategory");
    });
  };

  const getPostsByUserId = (userId, page = 1) => {
    setUserId(userId);
    apis.get.getPostsByUserId(userId, page).then((res) => {
      setAllPosts(res.data.data.data);
      setPagination(res.data.data);
      setActive("allPostsByUser");
    });
  };

  const onChange = (type, page) => {
    if (type === "allPosts") {
      getAllPosts(page);
    } else if (type === "allPostsByCategory") {
      getPostsByCategory(categoryId, page);
    } else if (type === "allPostsByUser") {
      getPostsByUserId(userId, page);
    } else {
      getSearchedPosts(query, page);
    }
  };

  return (
    <div>
      <div className="dashboard-wrapper">
        <div>
          <Button
            type={active === "allPosts" && "primary"}
            onClick={() => {
              setQuery("");
              getAllPosts();
            }}
            style={{ marginBottom: "1rem", display: "block" }}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              type={
                (active === "allPostsByCategory" ||
                  active === "allSearchedPosts") &&
                categoryId === category.id &&
                "primary"
              }
              onClick={() => {
                setQuery("");
                getPostsByCategory(category.id);
              }}
              style={{ marginRight: "1rem", marginBottom: "1rem" }}
              key={category.id}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <Search
          placeholder="Search for a blog..."
          onSearch={(query) => {
            getSearchedPosts(query);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
          enterButton
          style={{ marginBottom: "1rem" }}
        />
        <List
          className="comment-list"
          header={`${allPosts.length && pagination.total} blogs`}
          itemLayout="horizontal"
          dataSource={allPosts}
          renderItem={(item) => (
            <li>
              <Comment
                actions={[
                  <span key="comment-list-reply-to-0">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => getPostsByCategory(item.category.id)}
                    >
                      {item.category.name}
                    </span>
                  </span>,
                  <span
                    onClick={() =>
                      history.push({
                        pathname: `/post/${item.id}`,
                        state: item,
                      })
                    }
                    key="comment-list-reply-to-0"
                  >
                    Comment
                  </span>,
                ]}
                author={
                  <div>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => getPostsByUserId(item.user.id)}
                    >
                      {item.user.username}
                    </span>
                    {item.user.id === 1 && (
                      <span
                        style={{
                          cursor: "pointer",
                          marginLeft: "1rem",
                          color: "#1890FF",
                        }}
                        onClick={() =>
                          history.push({ pathname: "/edit-blog", state: item })
                        }
                      >
                        Edit Post
                      </span>
                    )}
                  </div>
                }
                content={
                  <div>
                    <h2
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        history.push({
                          pathname: `/post/${item.id}`,
                          state: item,
                        })
                      }
                    >
                      {item.title}
                    </h2>
                    <p>{item.body}</p>
                  </div>
                }
                datetime={moment(item.updated_at).fromNow()}
              />
            </li>
          )}
        />
        {active === "allPosts" && (
          <Pagination
            current={pagination.current_page}
            onChange={(page) => onChange("allPosts", page)}
            simple
            total={pagination.total}
          />
        )}
        {active === "allPostsByCategory" && (
          <Pagination
            current={pagination.current_page}
            onChange={(page) => onChange("allPostsByCategory", page)}
            simple
            total={pagination.total}
          />
        )}
        {active === "allPostsByUser" && (
          <Pagination
            current={pagination.current_page}
            onChange={(page) => onChange("allPostsByUser", page)}
            simple
            total={pagination.total}
          />
        )}
        {active === "allSearchedPosts" && (
          <Pagination
            current={pagination.current_page}
            onChange={(page) => onChange("allSearchedPosts", page)}
            simple
            total={pagination.total}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
