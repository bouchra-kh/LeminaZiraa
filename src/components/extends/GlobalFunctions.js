

export const UserHasAccess = (role) => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.warn(user)
    if(user){
        const roles = user.roles.map(role => (role.id))
    if(roles.includes(role)){
        return true;
    }
    }
    return false;
}

export const UserRoles = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        const roles = user.roles.map(role => (role.id))
    return roles;
    }
}

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        console.warn(user)
return user;
    }else{
        return []
    }
}



export const ADMIN = 1;
export const CONSEILLER_AGRICOLE = 2;
export const USER = 3;