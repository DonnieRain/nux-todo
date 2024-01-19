export const getUsers = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    return users
}

export const getPhoto = async() => {
    const response = await fetch('https://random.imagecdn.app/500/150')
    return response.url
}

export const getTodoList = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const list = await response.json()
    return list
}