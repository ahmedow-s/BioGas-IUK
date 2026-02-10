import { useState } from "react"
import Button from "../shared/ui/Button"
import Input from "../shared/ui/Input"
import PasswordInput from "../shared/ui/PasswordInput"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setToken } from '../shared/lib/redux/slices/authSlice'
import type { AppDispatch } from '../shared/lib/redux/store'

type AuthType = "farmer" | "admin"

export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authType, setAuthType] = useState<AuthType>("farmer")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mockToken = 'mock-token-12345'
    dispatch(setToken({ token: mockToken, user: { name: email || 'Demo User', role: authType === 'admin' ? 'Администратор' : 'Фермер' } }))
    navigate("/")
  }

  return (
    <div className="w-full min-h-screen bg-[#ffffff] flex items-center justify-center font-inter px-4">
      <div className="w-full max-w-[1392px] bg-[#F9F9F9] flex flex-col lg:flex-row items-center justify-center p-6 lg:p-10 gap-10">
        
        <div className="w-full max-w-[450px] flex flex-col gap-10 text-center">
          
          <div className="text-[#1F2937] flex flex-col gap-4 items-center">
            <h1 className="text-[36px] font-semibold">DIGITAL BIOGAS</h1>
            <h2 className="max-w-[400px] text-[24px] font-medium">
              IoT-платформа мониторинга и управления биогазовым установками
            </h2>
          </div>

          <div className="flex justify-center gap-4">
            {(["farmer", "admin"] as AuthType[]).map(type => (
              <Button
                key={type}
                onClick={() => setAuthType(type)}
                className={`
                  text-[20px] h-[50px] rounded-lg bg-[#FFFFFF]
                  shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                  hover:bg-[#F0F0F0]
                  ${type === "farmer" ? "w-[150px]" : "w-[197px]"}
                  ${authType === type ? "text-[#1E7F43]" : "text-[#8E8E93B5]"}
                `}
              >
                {type === "farmer" ? "Фермер" : "Администратор"}
              </Button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full"
          >
            <Input
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-[#FFFFFF] shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg w-full h-[45px] text-[#8E8E93] p-4"
              placeholder="Email"
            />

            <PasswordInput
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              onClick={()=>{}}
              className="bg-[#1E7F43] text-white text-[20px] w-full h-[45px] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#1A6B3A]"
            >
              Войти
            </Button>
          </form>
        </div>

        <div className="hidden lg:block w-full max-w-[802px]">
          <img
            src="/img/loginPage.jpg"
            alt="Farm"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  )
}
