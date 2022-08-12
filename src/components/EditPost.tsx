import he from "he";
import { useEffect, useRef, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useNavigate, useParams } from "react-router-dom";
import PostI from "../interfaces/Post";
import { responseError } from "../interfaces/responseError";
import { fetchAPI, fetchAPIForm } from "../utils/fetchAPI";
import Editor from "./Editor";
import ImageBfr from "./ImageBfr";
import Loading from "./Loading";
import "./style/Form.scss";
function EditPost() {
    const editorTextRef = useRef<{ getText: () => string; setText: (value: string) => void }>();
    const { postId } = useParams();
    const [post, setPost] = useState<PostI>();
    const [errors, setErrors] = useState<Array<responseError>>();
    const [loading, setLoading] = useState(<></>);
    const navigate = useNavigate();
    const postRoute = `/posts/${postId}`;

    const getPost = async () => {
        const res = await fetchAPI(postRoute);
        if (res.status === 200) {
            setPost(res.body.post);
        } else {
            NotificationManager.error(`${res.status} ${res.body}`);
        }
    };
    const formSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(<Loading />);
        const submitButton = e.currentTarget.querySelector(
            "input[type=submit]"
        ) as HTMLInputElement;
        submitButton.disabled = true;
        const editorText = editorTextRef.current?.getText();
        const res = await fetchAPIForm(postRoute, "PATCH", { content: editorText });
        setLoading(<></>);
        if (res.status === 400) {
            submitButton.disabled = false;
            setErrors(res.body.errors);
        } else if (res.status === 200) {
            navigate(postRoute);
        } else {
            NotificationManager.error(`${res.status} ${res.body}`);
        }
    };
    useEffect(() => {
        getPost();
    }, [postId]);
    useEffect(() => {
        editorTextRef.current?.setText(he.decode(post?.content || ""));
    }, [post]);
    return (
        <form className="form" onSubmit={formSubmitted}>
            <header>Editing {post?.author.firstName}'s post</header>
            <Editor ref={editorTextRef} />
            <ImageBfr image={post?.image} type="post" />
            {loading}
            {errors && (
                <ul>
                    {errors.map((error, index) => {
                        return (
                            <li className="error" key={index}>
                                {error.msg}
                            </li>
                        );
                    })}
                </ul>
            )}
            <input type="submit" />
        </form>
    );
}
export default EditPost;
