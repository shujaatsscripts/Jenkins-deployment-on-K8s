import React, { useState, useEffect } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import axios, { baseUrl } from "../../utils/axios";
import moment from "moment";

const { TextArea } = Input;

const CommentList = ({ comments, commentCount }) => (
  <List
    dataSource={comments}
    header={`${commentCount} ${commentCount > 1 ? "Comments" : "Comment"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea
        rows={2}
        onChange={onChange}
        value={value}
        style={{ borderRadius: "12px" }}
      />
    </Form.Item>
    <Form.Item>
      <Button
        style={{ float: "right" }}
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const App = ({ post, handleComment, commentCount }) => {
  // const [author, setAuthor] = useState(`${post.firstName} ${post.lastName}`);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      const res = await axios.get(
        `${baseUrl}/api/comment/getAllCommentsById/${post.uuid}`
      );
      // let data = [
      //   {
      //     author: "Han Solo",
      //     avatar: "https://joeschmoe.io/api/v1/random",
      //     content: <p>{value}</p>,
      //     datetime: moment().fromNow(),
      //   },
      //   {
      //     author: "Han Solo",
      //     avatar: "https://joeschmoe.io/api/v1/random",
      //     content: <p>{value}</p>,
      //     datetime: moment().fromNow(),
      //   },
      // ];
      setComments(res.data);
      setLoading(false);
    };
    apiCall();
  }, []);

  // state = {
  //   comments: [],
  //   submitting: false,
  //   value: "",
  // };

  const handleSubmit = async () => {
    if (!value) {
      return;
    }

    setSubmitting(true);
    // this.setState({
    //   submitting: true,
    // });

    axios
      .post(`${baseUrl}/api/comment/addComment`, {
        postID: post.uuid,
        description: value,
      })
      .then((res) => {
        setComments([
          ...comments,
          {
            author: `${post.firstName} ${post.lastName}`,
            // avatar: "https://joeschmoe.io/api/v1/random",
            content: value,
            datetime: moment().fromNow(),
          },
        ]);
        handleComment();
        setSubmitting(false);
      });
    setSubmitting(false);

    // setTimeout(() => {
    //   setSubmitting(false);
    //   setValue("");
    //   setComments([
    //     ...comments,
    //     {
    //       author: "user name",
    //       // avatar: "https://joeschmoe.io/api/v1/random",
    //       content: <p>{value}</p>,
    //       datetime: moment().fromNow(),
    //     },
    //   ]);
    //   handleComment();
    // }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    // this.setState({
    //   value: e.target.value,
    // });
  };

  // render() {
  // const { comments, submitting, value } = this.state;

  return (
    <>
      {comments.length > 0 && !loading && (
        <CommentList comments={comments} commentCount={commentCount} />
      )}
      <Comment
        // avatar={
        //   <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        // }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
  // }
};

// ReactDOM.render(<App />, mountNode);

export default App;
