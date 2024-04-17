import { zaposleniCollectionRef } from '../config/Firebase';

import { doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"; 

export const userService = {
    login,
    logout,
    updatePassword,
    user,
};

function user(){
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.exp) {
        let date = new Date();
        let exp = window.atob(user.exp)
        if (exp < formatDateToCustomString(date)){
            logout();
            return undefined;
        }   
    }
    return user
}

async function login(username, password) {
    
    try {
        const q =  query(zaposleniCollectionRef, where("Email", "==", username), where("Password", "==", password));
        const response = await getDocs(q);
        const users = response.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }))

        let date = new Date();
        date = new Date(date.getTime() + (20 * 60 * 1000));

        if (users.length === 1) {
            let user = {
                
                "ime" : users[0].Ime,
                "email" : users[0].Email,
                "authdata": window.btoa(username + ':' + password),
                "exp": window.btoa(formatDateToCustomString(date)),
                "role" : users[0].Rola
            }

            if (users[0].PasswordReset){
                return {Id : users[0].id, PasswordReset : true }
            }

            localStorage.setItem('user', JSON.stringify(user));
            return {Id : users[0].id, PasswordReset : false }
        }
        logout();
        return Promise.reject()      
    } 
    catch (error) {
        console.error('Greška:', error);
        return Promise.reject(error) 
        
    } 
}

function logout() {
    localStorage.removeItem('user');
}

function updatePassword(id, password) {

    if (id) { 
       
        const fetchData = async () => {
          try {
            const docRef = doc(zaposleniCollectionRef, id)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              
                let user = docSnap.data();

                if (user && user.Password && password){
                    const docRef = doc(zaposleniCollectionRef, id)
        
                    user.Password = password;
                    user.PasswordReset = false;
                   
                    await setDoc(docRef, user);

                    return true
                }
                
                
              } else {
                console.log('Nema takvog dokumenta!');
              }
          } catch (error) {
            console.error('Greška pri dohvaćanju dokumenta:', error);
          } 
          return false;
        };
    
        return fetchData();

    }
    return false;
}

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }

function formatDateToCustomString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}