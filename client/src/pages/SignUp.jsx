import { Button, Label, TextInput } from "flowbite-react";
import {Link} from "react-router-dom";
export default function SignUp() {
    return (
        <div className="min-h-screen mt-20 ">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
                {/* left side */}
                <Link to="/" className="font-bold dark:text-white text-4xl">
                <div className="flex items-center">
                    <img src="../assets/logo.png" alt="Logo" />
                    <span>iBlog</span>
                </div>
            </Link>
            <p className="text-sm mt-5">
                welcome to our blog website you can sign up by using your e-mail and password or by useing google
            </p>
            </div>
            {/* right side */}
            <div className="flex-1">
                    <form className=" flex flex-col gap-4">
                        <div>
                            <Label value="User Name"/>
                            <TextInput type="text" placeholder="Username" id="username" />
                        </div>
                        <div>
                            <Label value="e-mail"/>
                            <TextInput type="text" placeholder="name@company.com" id="email" />
                        </div>
                        <div>
                            <Label value="Password"/>
                            <TextInput type="text" placeholder="Password" id="password" />
                        </div>
                        <Button gradientDuoTone="purpleToPink" outline type="submit">
                            Sign Up
                        </Button>
                    </form>
                    <div className=" flex gap-2 text-sm mt-5">
                    <span> Have an account ? </span>
                    <Link to='/sign-in' className="text-blue-500">
                    Sign In
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );   
}
