import { FormCreateNewRoom } from "@/components/forms/FormCreateNewRoom";

const CreateRoom = ()=>{
    return (
       <div>
        <h3 className="text-2xl font-semibold ">Create New Room </h3>
         <div className="w-full lg:bg-dark-200 px-2 lg:px-10 py-10 lg:max-w-[820px]  ">
           <FormCreateNewRoom/>
        </div>
       </div>
    )

}

export default CreateRoom;