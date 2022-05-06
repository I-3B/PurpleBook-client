import { BufferData } from "../interfaces/User";
import ImageBfr from "./ImageBfr";
import './style/Author.scss'
interface Props {
    author: { _id: string; firstName: string; lastName: string; imageMini: BufferData };
}
function Author({ author }: Props) {
    return (
        <address className="author">
            <a rel="author" href={"/users/" + author._id}>
                <ImageBfr image={author.imageMini} type="profile"></ImageBfr>
                <span>{author.firstName + " " + author.lastName}</span>
            </a>
        </address>
    );
}

export default Author;
