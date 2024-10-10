import { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import {Link , useNavigate} from "react-router-dom";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [errorMessage , setErrorMessage] = useState(null);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const handelChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value.trim() });
    };
    const handelSubmit = async (e)=>{
        e.preventDefault();
        if(!formData.username || !formData.email || !formData.password){
            return setErrorMessage("please fill out all fields. ");
        }
        try{ 
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('/api/auth/signup',{
                method: "POST",
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success===false){
                return setErrorMessage(data.message);
            }
            setLoading(false);
            if(res.ok){
                navigate('/sign-in');
            }
        }
        catch(err) {
            setErrorMessage(err.message);
            setLoading(false);
        }
    };
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
                    <form className=" flex flex-col gap-4" onSubmit={handelSubmit}>
                        <div>
                            <Label value="User Name"/>
                            <TextInput type="text" placeholder="Username" id="username" onChange={handelChange} />
                        </div>
                        <div>
                            <Label value="e-mail"/>
                            <TextInput type="email" placeholder="name@company.com" id="email" onChange={handelChange} />
                        </div>
                        <div>
                            <Label value="Password"/>
                            <TextInput type="password" placeholder="Password" id="password" onChange={handelChange} />
                        </div>
                        <Button gradientDuoTone="purpleToPink" outline type="submit" disabled={loading}>
                            {
                                loading ? (
                                    <>
                                    <Spinner size="sm"/>
                                    <span className="pl-3">
                                        loading...
                                    </span>
                                    </>
                                ) : 'Sign Up' 
                            }
                        </Button>
                    </form>
                    <div className=" flex gap-2 text-sm mt-5">
                    <span> Have an account ? </span>
                    <Link to='/sign-in' className="text-blue-500">
                    Sign In
                    </Link>
                    </div>
                    {
                        errorMessage &&(<Alert className="mt-5" color={"failure"}>
                            {errorMessage}
                        </Alert>)
                    }
                </div>
            </div>
        </div>
    );   
}
