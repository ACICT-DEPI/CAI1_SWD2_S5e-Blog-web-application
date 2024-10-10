import { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import {Link , useNavigate} from "react-router-dom";
import { signInStart,signInSuccess,signInFailure} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const {loading , error :errorMessage} = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handelChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value.trim() });
    };
    const handelSubmit = async (e)=>{
        e.preventDefault();
        if(!formData.email || !formData.password){
            return dispatch(signInFailure("Please fill all fields"));
        }
        try{ 
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin',{
                method: "POST",
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success===false){
                dispatch(signInFailure(data.message));
            }
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/');
            }
        }
        catch(err) {
            dispatch(signInFailure(err.message));
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
                welcome to our blog website you can sign in by using your e-mail and password or by using google
            </p>
            </div>
            {/* right side */}
            <div className="flex-1">
                    <form className=" flex flex-col gap-4" onSubmit={handelSubmit}>
                        <div>
                            <Label value="e-mail"/>
                            <TextInput type="email" placeholder="name@company.com" id="email" onChange={handelChange} />
                        </div>
                        <div>
                            <Label value="Password"/>
                            <TextInput type="password" placeholder="********" id="password" onChange={handelChange} />
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
                                ) : 'Sign In' 
                            }
                        </Button>
                    </form>
                    <div className=" flex gap-2 text-sm mt-5">
                    <span> Have not an account ? </span>
                    <Link to='/sign-up' className="text-blue-500">
                    Sign Up
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
