import { useState } from "react";
import Button from "../shared/ui/Button";
import Input from "../shared/ui/Input";
import PasswordInput from "../shared/ui/PasswordInput";

export default function Login() {
    const [authType, setAuthType] = useState<"farmer" | "admin">("farmer");
    const handleAuthTypeChange = (type: "farmer" | "admin") => {
        setAuthType(type);
    }   
    const [activeButton, setActiveButton] = useState<string | null>("farmer");
    
    return (
        <div className="max-w-full w-full m-auto  bg-[#ffffff] flex items-center font-inter justify-center min-h-screen py-2">
            <div className="max-w-[1392px]  my-auto bg-[#F9F9F9] flex items-center justify-center p-10">
                <div className="w-[450px] mr-20 flex flex-col gap-10 text-center">
                    <div className="text-[#1F2937] flex flex-col gap-4 items-center">
                    <h1 className="text-[36px] font-semibold font-[600]">DIGITAL BIOGAS</h1>
                    <h2 className="w-[400px]  text-[24px] font-medium font-[500] ">IoT-платформа мониторинга и управления биогазовым установками</h2>
                    </div>
                    <div className=" flex flex-col gap-10">
                        <div className="flex items-center justify-center" >
                            <Button  onClick={() => {handleAuthTypeChange("farmer"); setActiveButton("farmer");}} className={activeButton === "farmer" ? "text-[#1E7F43] ml-4   text-[20px] w-[150px] h-[50px] rounded-lg bg-[#FFFFFF] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#F0F0F0]"  : "ml-4 text-[#8E8E93B5]  text-[20px] w-[150px] h-[50px] rounded-lg bg-[#FFFFFF] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#F0F0F0]"} >
                                Фермер
                            </Button>
                            <Button onClick={() => {handleAuthTypeChange("admin"); setActiveButton("admin");}} className={activeButton === "admin" ? "ml-4  text-[#1E7F43]   text-[20px] w-[197px] h-[50px] rounded-lg bg-[#FFFFFF] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#F0F0F0]" : "ml-4 text-[#8E8E93B5]  text-[20px] w-[197px] h-[50px] rounded-lg bg-[#FFFFFF] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#F0F0F0]"} >
                                Администратор
                            </Button>
                        </div>
                        <div>
                        <form action="" className="flex flex-col gap-4">
                            <div>
                                <Input required  type="email" className="bg-[#FFFFFF] shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg  w-[450px] h-[45px] text-[#8E8E93] font-regular p-4" placeholder="Email"/>
                            </div>
                            <div>
                                <PasswordInput  />
                            </div>
                            <Button onClick={()=>{}}  className="bg-[#1E7F43] text-white text-[20px] w-[450px] h-[45px] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#1A6B3A]" >Войти</Button>
                        </form>
                        </div>
                    </div>
                </div>
                <div className="w-[802px] h-[581px]">
                    <img src="/img/loginPage.jpg" alt="Farm" />
                </div>
            </div>
        </div>
    );
}