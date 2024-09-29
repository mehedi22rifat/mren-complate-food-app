import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import { useQuery } from "@tanstack/react-query"


const useCard = () => {
    const {user} = useContext(AuthContext)
    // console.log(user)
    const token = localStorage.getItem('access-token')

    const {refetch,data:cart = []} = useQuery({
        queryKey: ['cards', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:6001/cards?email=${user?.email}`,{
              // for token
              headers:{
                authorization:`Bearer ${token}`
              }
            })
            return res.json()
          },
    })
  return [cart,refetch]
}

export default useCard