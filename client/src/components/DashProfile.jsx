import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getStorage, uploadBytesResumable , ref, getDownloadURL } from "firebase/storage";
import {app} from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart , updateSuccess ,updateFailure } from "../redux/user/userSlice";
import { deleteUserStart , deleteUserSuccess ,deleteUserFailure } from "../redux/user/userSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import {HiOutlineExclamationCircle} from 'react-icons/hi';
export default function DashProfile(){
    const {currentUser , error} = useSelector(state => state.user);
    const [imageFile , setImageFile] = useState(null);
    const [imageFileUrl , setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress , setImageFileUploadingProgress] = useState(null);
    const [imageFileUploadingError , setImageFileUploadingError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [formData,setFormData] = useState({});
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal ,setShowModal] = useState(false);
    const dispatch = useDispatch();
    const filePickerRef = useRef();
    const handleSignOut = async () => {
        try {
            const res = await fetch(`/api/user/signout/`,{
                method: "POST",
            });
            const data = await res.json();
            if(!res.ok) {
                console.error(data.message);
            }else{
                dispatch(signoutSuccess());
            }
        } catch (error){
            console.error(error.message);
        }
    };
    const handelDeleteUser = async () =>{
        setShowModal(false);
        try{
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delte/${currentUser._id}`,{
                method: "DELETE",
            });
            const data = await res.json();
            if(!res.ok){
                dispatch(deleteUserFailure(data.message));
            } else {
                dispatch(deleteUserSuccess(data));
            }
        } catch(error){
            dispatch(deleteUserFailure(error.message));
        }
    };
    const handleChange = (e) => {
        setFormData({...formData , [e.target.id]:e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if(Object.keys(formData).length === 0){
            setUpdateUserError('No changes made');
            return;
        }
        if(imageFileUploading){
            setUpdateUserError('please wait for image to upload');
            return;
        }
        try{
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}` , {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(!res.ok){
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            }else{
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User's profile updated successfully");
            }
        } catch (error){
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
        }
    };
    const handelImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }; 
    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    } , [imageFile]);
    const uploadImage = async ()=>{
        setImageFileUploading(true);
        setImageFileUploadingError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage , fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on('state_changed' , (snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            setImageFileUploadingProgress(progress.toFixed(0));
        }, (error)=>{
                setImageFileUploadingError('Could not upload image (File Must Be Lessthan 2MB)');
                console.error(error);
                setImageFileUploadingProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
        },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then( (downloadURL)=>{
                setImageFileUrl(downloadURL);
                setFormData({...FormData , profilePicture: downloadURL});
                setImageFileUploading(false);
            });
        }
    );
    };
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="file" accept="image/*" onChange={handelImageChange} ref={filePickerRef} hidden/>
            <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full 
                bg-gradient-to-r from-purple-500 to-pink-500 p-1" onClick={()=>filePickerRef.current.click()}>
                {imageFileUploadingProgress && imageFileUploadingProgress < 100 && (<CircularProgressbar value={imageFileUploadingProgress || 0}
                text={`${imageFileUploadingProgress}%`} strokeWidth={5} styles={{
                    root: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }, path:{ 
                        stroke:`rgba(62 , 152 , 199 ,${imageFileUploadingProgress/100})`,
                    },
                }}/>)} 
                <img
                    src={imageFileUrl || currentUser.profilePicture}
                    alt="user"
                    className={`rounded-full w-full h-full object-cover border-2 
                        ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'}` }
                />
                </div>
                {imageFileUploadingError && <Alert color="failure">{imageFileUploadingError}</Alert>}
                <TextInput 
                type="text"
                id="username" 
                placeholder="username"
                defaultValue={currentUser.username} 
                onChange={handleChange}
                />
                <TextInput 
                type="text"
                id="email" 
                placeholder="email"
                defaultValue={currentUser.email} 
                onChange={handleChange}
                />
                <TextInput 
                type="password"
                id="password" 
                placeholder="password" 
                onChange={handleChange}
                />
                <Button type="submit" gradientDuoTone="purpleToPink" outline>
                    Update
                </Button>
            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span onClick={()=>setShowModal(true)} className="cursor-pointer">Delet Account</span>
                <span onClick={handleSignOut} className="cursor-pointer">Sign Out</span>
            </div>
            {updateUserSuccess && (<Alert color="success" className="my-5">
                {updateUserSuccess}
            </Alert> )}
            {updateUserError && (<Alert color="failure" className="my-5">
                {updateUserError}
            </Alert> )}
            {error && (<Alert color="failure" className="my-5">
                {error}
            </Alert> )}
            <Modal show={showModal} onClose={()=>setShowModal(false)} popup size="md">
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-red-600 mb-4 mx-auto'/>
                        <h3 className="mb-5 text-lg text-gray-700">Are you sure you want to Delete your account? </h3>
                        <div className=" flex justify-center gap-4">
                        <Button color="failure" onClick={handelDeleteUser}>
                            I am sure
                        </Button>
                        <Button color="purple" onClick={()=>setShowModal(false)}>
                            I am not sure
                        </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};