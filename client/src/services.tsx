

const baseURL = "http://localhost:3006"



export const addItem = async (data: FormData, token:string) => {
  return await fetch(`${baseURL}/items`,{
    method: 'POST',
    body: data,
    headers: {
      authorization: `Bearer ${token}`
    },
    credentials: 'include',
    mode:'cors'
  })
  .then(data => data.json())
  .then(result => result)
}


export const getUserById = async (id: String) => {
  try {
    const response = await fetch(`${baseURL}/users/${id}`)
    return response.json();
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getUserByEmail = async (email:String) => {
  try {
    const response = await fetch(`${baseURL}/users/${email}`)
    return response.json();
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getItemById = async (id:String) => {
  try {
    const response = await fetch(`${baseURL}/items/${id}`)
    return response.json();
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getItemByCategory = async (category:String) => {
  try {
    const response = await fetch(`${baseURL}/items/category/${category}`)
    return response.json();
  } catch (err) {
    console.log(err)
    return false
  }
}
