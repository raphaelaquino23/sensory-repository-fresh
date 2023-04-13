import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { axiosPrivate } from "../../api/axios";
import ForumService from "../../services/ForumService";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SPACE_REGEX = /^[A-z][A-z0-9-.,_ ]{3,50}$/;
const SPACE2_REGEX = /^[A-z][A-z0-9-.,?!'_ ]{3,250}$/;

const AddPost = () => {
  const [postinformation, setNewPostInformation] = useState({
    PostInformation_Title: "",
    PostInformation_Content: "",
    PostCategory_Title: "Select Category",
    PostInformation_Censor: true
  });
  const [selectedItem, setSelectedItem] = useState("");

  const [validTitle, setValidTitle] = useState(false);
  const [validContent, setValidContent] = useState(false);
  const [postFocus, setPostFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const onInputChange = (e: React.ChangeEvent<any>) => {
    setNewPostInformation({
      ...postinformation,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setErrMsg("");
  }, [postinformation]);

  const { PostInformation_Title, PostInformation_Content, PostCategory_Title, PostInformation_Censor } =
    postinformation;

  useEffect(() => {
    const result = SPACE_REGEX.test(PostInformation_Title);
    setValidTitle(result);
  }, [PostInformation_Title]);

  useEffect(() => {
    const result = SPACE2_REGEX.test(PostInformation_Content);
    setValidContent(result);
  }, [PostInformation_Content]);

  const getCategoryId = (selectedItem: string): number => {
    switch (selectedItem) {
      case "General":
        return 1;
      case "News":
        return 2;
      case "Update":
        return 3;
      case "Help":
        return 4;
      case "Question":
        return 5;
      default:
        return 1;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const v1 = SPACE_REGEX.test(PostInformation_Title);
    const v2 = SPACE2_REGEX.test(PostInformation_Content);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    const res = await axiosPrivate.get(
      `http://localhost:3081/api/getuserid/${localStorage.getItem("username")}`
    );

    const postObject = {
      post: {
        User_Id: res.data,
      },
      postInformation: {
        PostInformation_Title: PostInformation_Title,
        PostInformation_Content: PostInformation_Content,
        PostCategory_Id: getCategoryId(selectedItem),
        PostInformation_Censor: PostInformation_Censor
      },
      postStats: {
        PostStats_Upvotes: 0,
        PostStats_Clicks: 0,
      },
      postCat: {
        PostCategory_Title: selectedItem,
      },
    };
    setSuccess(true);
    ForumService.create(postObject).then((returnedPost: any) => returnedPost);
    window.location.reload();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Post Title"
          name="PostInformation_Title"
          value={PostInformation_Title}
          onChange={(e) => onInputChange(e)}
          required
          style={{ width: "310px" }}
          aria-invalid={validTitle ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setPostFocus(true)}
          onBlur={() => setPostFocus(false)}
        />
        <p
          id="uidnote"
          className={
            postFocus && PostInformation_Title && !validTitle
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Field must not be empty
        </p>
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="textarea"
          placeholder="Post Content"
          rows={3} //changed row to rows
          name="PostInformation_Content"
          value={PostInformation_Content}
          onChange={(e) => onInputChange(e)}
          required
          style={{ width: "310px" }}
          aria-invalid={validContent ? "false" : "true"}
          aria-describedby="dcnote"
          onFocus={() => setPostFocus(true)}
          onBlur={() => setPostFocus(false)}
        />
        <p
          id="dcnote"
          className={
            postFocus && PostInformation_Content && !validContent
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Field must not be empty
        </p>
      </Form.Group>
      <Form.Group>
        <Form.Select
          style={{ width: "310px" }}
          defaultValue={""}
          placeholder={"Select Category"}
          onChange={(e) => {
            setSelectedItem(e.target.value);
          }}
        >
          <option hidden value="">
            Select Category
          </option>
          <option value={"General"}>General</option>
          <option value={"News"}>News</option>
          <option value={"Update"}>Update</option>
          <option value={"Help"}>Help</option>
          <option value={"Question"}>Question</option>
        </Form.Select>
        <br />
      </Form.Group>

      <Button variant="success" type="submit" style={{ width: "310px" }}>
        Add New Post
      </Button>
    </Form>
  );
};
export default AddPost;