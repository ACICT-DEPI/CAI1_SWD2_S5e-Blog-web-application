import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost(){
    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput type="text" placeholder="Title" required id="title"
                    className="flex-1"/>
                    <Select>
                        <option value="uncategorized">Select a category</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="javascript">JavaScript (JS)</option>
                        <option value="react.js">React.Js</option>
                        <option value="next.js">Next.Js</option>
                        <option value="node.js">Node.Js</option>
                        <option value="mongodb">Mongo DB</option>
                        <option value="angulr">Angulr</option>
                        <option value="express">Express</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between border-4 border-teal-700 border-dashed p-3">
                    <FileInput type='file' accept="image/*"/>
                    <Button type="button" gradientDuoTone="purpleToBlue" size="sm">
                    Upload Image
                    </Button>
                </div>
                <ReactQuill theme="snow" placeholder="Write Something..... " className="h-72 mb-12" required/>
                <Button type="submit" gradientDuoTone="purpleToBlue" outline className="mb-6">
                    Publish
                </Button>
            </form>
        </div>
    );
};