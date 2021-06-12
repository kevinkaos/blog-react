import React, { useEffect, useState } from "react";
import { Comment, List, Button, Pagination } from "antd";
import moment from "moment";
// import ReplyBox from "./ReplyBox";
// import Header from "./Header";
import apis from "../api/apis";

const Dashboard = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [active, setActive] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    apis.get.getCategories().then((res) => {
      setCategories(res.data.data);
    });
    getAllPosts();
  }, []);

  const getAllPosts = (page = 1) => {
    apis.get.getAllPosts(page).then((res) => {
      setAllPosts(res.data.data.data);
      setPagination(res.data.data);
      setActive("allPosts");
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
    } else {
      getPostsByUserId(userId, page);
    }
  };

  return (
    <div>
      <div className="dashboard-wrapper">
        <Button onClick={() => getAllPosts()} style={{ marginRight: "1rem" }}>
          All
        </Button>
        {categories.map((category) => (
          <Button
            onClick={() => getPostsByCategory(category.id)}
            style={{ marginRight: "1rem" }}
            key={category.id}
          >
            {category.name}
          </Button>
        ))}
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
                  <span key="comment-list-reply-to-0">Reply to</span>,
                ]}
                author={
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => getPostsByUserId(item.user.id)}
                  >
                    {item.user.username}
                  </span>
                }
                content={item.body}
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
      </div>
    </div>
  );
};

export default Dashboard;
