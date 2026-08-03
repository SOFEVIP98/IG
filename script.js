import {
    auth,
    provider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "./firebase.js";

const loginBtn = document.getElementById("loginBtn");
const claimBtn = document.getElementById("claimBtn");
const status = document.getElementById("status");
const result = document.getElementById("result");

loginBtn.onclick = async () => {

    try{

        await signInWithPopup(auth,provider);

    }catch(err){

        alert(err.message);

    }

};

onAuthStateChanged(auth,(user)=>{

    if(user){

        status.innerHTML = `
        مرحباً ❤️<br>
        ${user.displayName}
        `;

        loginBtn.style.display="none";
        claimBtn.style.display="block";

    }else{

        status.innerHTML="سجل دخولك حتى تستلم حساب";

        loginBtn.style.display="block";
        claimBtn.style.display="none";

    }

});

claimBtn.onclick=()=>{

    result.style.display="block";

    result.innerHTML=`
📧 Email

example@gmail.com

🔑 Password

12345678

⚠️ هذا مجرد مثال
`;

};
