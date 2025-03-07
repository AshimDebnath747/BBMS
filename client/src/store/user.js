import {create} from 'zustand';

export const userStore = create(() => ({
    users : [],
    createUser : async (user)=>{
        const res = await fetch(`/api/${user.role}/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        });
        const data = await res.json();
        return data;
    },
    loginUser: async (user)=>{
        const res = await fetch(`/api/${user.role}/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        });
        const data = await res.json();
        return data;
    },
}));