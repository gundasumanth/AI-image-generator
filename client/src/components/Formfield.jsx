import React from 'react'

const Formfield = ({labelName,name,type,value,placeholder,handleChange,isSupriseMe,handleSupriseMe}) => {
  return (
    <div>
      <div className="flex item-center gap-2 mb-2">
       <label
       htmlFor={name} className="block text-sm font-medium text-gray-900">
       {labelName}
       </label>
       {isSupriseMe && 
       <button type="button" onClick={handleSupriseMe} className="font-semibold text-xs text-black px-1
       py-1 bg-[#ECECF1] rounded-5px">
        Suprise Me
       </button>}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className="text-sm  border bg-gray-50 border-gray=500 text-gray-900 roudend-lg
        focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"      />
    </div>
  )
}

export default Formfield;