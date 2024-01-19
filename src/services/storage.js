export const authID = () => {
    return localStorage.getItem('userid')
}

export const favoritesTodos = () => {
    return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : null
}