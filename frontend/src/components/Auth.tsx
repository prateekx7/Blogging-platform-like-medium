import {useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { SignupInput } from '@prateekx7/common';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

export const Auth = ({type}: { type:| "signup"|"signin"}) => {
    // const [name,setName] = useState("");
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: ""
    });

    async function sendRequest(){
        try{ 
          const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
          const jwt = response.data;
          //console.log(jwt);
          //console.log(jwt.jwt);
          localStorage.setItem("token",jwt.jwt);
          navigate("/blogs");
        }catch(e){
            alert("error while signing up!");
            //alerting the user the request failed

        }
    }


    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center ">
            <div>
                <div className='px-10'>
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-500">
                        {type==="signup" ? "Already have and account ?":"Dont have and account ?"}
                         
                        <Link className='pl-2 underline' to = {type==="signin"?"/signup":"/signin"}>
                            {type==="signup" ? "Sign in":"Sign up"}
                         </Link>
                    </div>
                </div>
                <div className='pt-7'>
                    {type === "signup" ?<LabelledInput label='Name' placeholder='Prateek Sharma' onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value});
                        }
                    }/> : null}
                    <LabelledInput label='Email' placeholder='prateeksharma@gmail.com' onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value});
                        }
                    }/>
                    <LabelledInput label='Password' type={'password'} placeholder='p$#qu!df0z%5' onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value});
                        }
                    }/>
                </div>
                <div>
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup" ? "Sign up":"Sign in"}</button>
                </div>
            </div>
        </div> 
    </div>
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label,placeholder,onChange,type}: LabelledInputType){
    return <div>
        <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
        <input onChange = {onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        
    </div>

}