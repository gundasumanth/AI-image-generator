import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getRandomPrompt} from "../utils"
import { Formfield,Loader } from '../components';
import {preview} from "../assets";

const CreatePost = () => {
  const navigate= useNavigate();
  const [form, setForm] = useState({
    name:'',
    prompt:'',
    photo:'',
  })
  
  const [generatingImg, setgeneratingImg] = useState(false)
  const [loading, setloading] = useState(false)
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(form.prompt && form.photo)
    {
      setloading(true)
    try {
     
      const response= await fetch("http://localhost:8080/post",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(form),
      })
        
        await response.json();
       
         navigate("/");
      }
     catch (error) {
      alert(error)
    }
    finally{
      setloading(false);
    }
  }
  else{
    alert("enter the prompt and photo");
  }
  }
  const handleChange=(e)=>{
   setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSupriseMe=()=>{
  const randomPrompt= getRandomPrompt(form.prompt)
  
  setForm({...form,prompt:randomPrompt})
  
  }
  const generateImg= async ()=>{
    if(form.prompt){
      try {
        setgeneratingImg(true)
        const response= await fetch("http://localhost:8080/dalle",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({prompt:form.prompt, })
      })
      const data= await response.json();
      
      setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
     
     
      } catch (error) {
        alert(error)
      }finally{
        setgeneratingImg(false)
      }
    }
    else{
      alert("please enter the prompt")
    }
  }
  return (
    <section className="max-w-7xl mx-auto">
    <div>
      <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
      <p className="mt-2 text-#[666e75] text-[16px] max-w">Create imaginative collections of
      stunning images through by DALL-E AI share with our community</p>
      </div>
    <form className=" mt-16 max-w-3xl" onSubmit={handleSubmit}>
     <div className="flex flex-col gap-5">
       <Formfield
        labelName="Your name"
        type="text"
        name="name"
        value={form.name}
        placeholder="Jennifer lopez"
        handleChange={handleChange}
       />
       <Formfield
        labelName="Prompt"
        type="text"
        name="prompt"
        value={form.prompt}
        placeholder="a sea otter with a pearl earring by Johannes Vermeer"
        handleChange={handleChange}
        isSupriseMe
        handleSupriseMe={handleSupriseMe}
       />
       <div className="relative w-64 h-64 flex justify-center item-center bg-gray-50 border
       border-gray-300 text-gray-900 texy-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
       ">
       {form.photo?(
        <img src={form.photo}
          alt={form.prompt}
          className="w-full h-full object-contain"
        />
       ):(
        <img src={preview}
          alt="preview"
          className="w-9/12 h-9/12 object-contain"
        />
       )}
       {generatingImg&&(
        <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgb(0,0,0,0.5)]
        rounded-lg">
        <Loader/>
        </div>
       )}
       </div>
     </div>
    <div className=" mt-10 flex flex-row gap-3">
    <div className="basis-1/2">
    <button
    type="button"
    onClick={generateImg}
    className="text-white text-sm font-medium sm-w:auto  bg-green-700 w-full rounded-lg  px-5 py-2.5"
    >
      {generatingImg?"Generating":"Generate"}
    </button>

    </div>
    <div className="basis-1/2">
     
     <button
     
     type="submit" 
     className=" text-white text-sm font-medium sm-w:auto bg-[#6469ff] w-full rounded-lg px-5 py-2.5">
      {loading? "sharing":"share with community"}
     </button>
    </div>
    </div>
    </form>
    </section>
  )
}

export default CreatePost