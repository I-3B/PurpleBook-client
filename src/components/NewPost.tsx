import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { responseError } from "../interfaces/responseError";
import { fetchAPIMultiPart } from "../utils/fetchAPI";
import Editor from "./Editor";
import Loading from "./Loading";
import "./style/Form.scss";
import "./style/NewEditPost.scss";
function NewPost() {
    const editorTextRef = useRef<{ getText: () => string }>();
    const [errors, setErrors] = useState<Array<responseError>>();
    const [loading, setLoading] = useState(<></>);
    const navigate = useNavigate();
    const newPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(<Loading />);
        const submitButton = e.currentTarget.querySelector(
            "input[type=submit]"
        ) as HTMLInputElement;
        submitButton.disabled = true;
        const editorText = editorTextRef.current?.getText();
        const formData = new FormData(e.currentTarget);
        formData.set("content", editorText ? editorText : "");
        const res = await fetchAPIMultiPart("posts", "POST", formData);
        setLoading(<></>);
        if (res.status === 400) {
            submitButton.disabled = false;
            setErrors(res.body.errors);
        } else if (res.status === 201) {
            navigate(`/posts/${res.body.postId}`);
        }
    };
    return (
        <form onSubmit={newPost} className="form">
            <header>Add new post</header>
            <Editor ref={editorTextRef} />
            <label htmlFor="img">add image</label>
            <input type="file" name="image" id="img" accept="image/png, image/gif, image/jpeg" />
            {errors && (
                <ul>
                    {errors.map((error, index) => {
                        return (
                            <li key={index} className="error">
                                {error.msg}
                            </li>
                        );
                    })}
                </ul>
            )}
            {loading}
            <input type="submit" value="Post" />
        </form>
    );
}
export default NewPost;
