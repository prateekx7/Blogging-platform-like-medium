import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"
export const FullBlog = ({blog} : {blog : Blog}) => {
    return <div>
            <Appbar/>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                    <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                            {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                            Posted on December 2nd 2024
                    </div>
                    <div className="pt-4">
                            {blog.content}
                    </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg">Author</div>
                        <div className="flex w-full">
                            <div className="pr-2 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"}/>
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="text-slate-500 pt-2">
                                    Random phrase about the author which will either 
                                    describe the author or the blog you are currently reading.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}