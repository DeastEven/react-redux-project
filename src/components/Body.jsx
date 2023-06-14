import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  Divider,
  Form,
  List,
  Pagination,
  Select,
  Spin,
  Typography,
} from "antd";
import Modal from "antd/es/modal/Modal";
import Input from "antd/es/input/Input";
import TextArea from "antd/lib/input/TextArea";
import { postReducerActions } from "../store/reducers/postReducer";
import PostService from "../API/PostService";
import { getPageCount, getPagesArray } from "../utils/pages";

const Body = () => {
  const { posts } = useSelector((state) => state.post);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [postData, setPostData] = useState({
    id: posts.length + 1,
    title: "",
    body: "",
  });
  const addPost = () => {
    dispatch({ type: postReducerActions.add_post, payload: postData });
  };
  const deletePost = (id) => {
    dispatch({ type: postReducerActions.delete_post, payload: id });
  };
  const options = [
    { value: "title", label: "Title" },
    { value: "body", label: "Description" },
  ];
  const sortPost = (value) => {
    dispatch({ type: postReducerActions.sort_post, payload: value });
  };
  const [postSum, setPostSum] = useState("");
  const [page, setPage] = useState(1);
  let pagesArray = getPagesArray(totalPages);
  const fetchPost = async () => {
    setIsPostLoading(true);
    const response = await PostService.getAll(10, page);
    dispatch({ type: postReducerActions.fetch_post, payload: response.data });
    setIsPostLoading(false);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, 10));
    setPostSum(totalCount);
  };
  const changePage = (page) => {
    setPage(page);
  };
  useEffect(() => {
    fetchPost();
  }, [page]);

  return (
    <div>
      <Divider orientation="left">Default Size</Divider>
      <Button
        style={{ marginLeft: "30px", marginRight: "30px" }}
        type="primary"
        onClick={showModal}
      >
        Add post
      </Button>
      <Select
        defaultValue="Sort"
        onChange={(event) => sortPost(event)}
        style={{
          width: 120,
        }}
        options={options}
      />
      {isPostLoading ? (
        <Spin tip="Loading...">
          <Alert
            message="The download is in progress"
            description="Please wait"
            type="info"
          />
        </Spin>
      ) : (
        <List
          bordered
          dataSource={posts}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[{item.id}]</Typography.Text> {item.title}
              <p>{item.body}</p>
              <Button onClick={(event) => deletePost(item.id)}>Delete</Button>
            </List.Item>
          )}
        />
      )}
      <Pagination
        defaultCurrent={1}
        total={postSum}
        showSizeChanger={false}
        onChange={(event) => changePage(event)}
      />
      <Modal
        title="Add post"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input
              value={postData.title}
              onChange={(event) =>
                setPostData({ ...postData, title: event.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <TextArea
              rows={4}
              value={postData.body}
              onChange={(event) =>
                setPostData({ ...postData, body: event.target.value })
              }
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" onClick={addPost}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Body;
