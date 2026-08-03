import {auth,provider,signInWithPopup,onAuthStateChanged,collection,getDocs,doc,deleteDoc,db} from "./firebase.js";

const loginBtn=document.getElementById("loginBtn");
const claimBtn=document.getElementById("claimBtn");
const status=document.getElementById("status");
const result=document.getElementById("result");

loginBtn.onclick=async()=>{try{await signInWithPopup(auth,provider);}catch(e){alert(e.message);}};

onAuthStateChanged(auth,u=>{
 if(u){
   status.innerHTML=`مرحباً ❤️<br>${u.displayName}`;
   loginBtn.style.display="none";
   claimBtn.style.display="block";
 }else{
   status.textContent="سجل دخولك حتى تستلم حساب";
   loginBtn.style.display="block";
   claimBtn.style.display="none";
 }
});

let claimed=false;
claimBtn.onclick=async()=>{
 if(claimed){alert("استلمت حساب بالفعل.");return;}
 const snap=await getDocs(collection(db,"accounts"));
 if(snap.empty){
   result.style.display="block";
   result.innerHTML="❌ نفذت الحسابات، راجعنا لاحقًا.";
   return;
 }
 const first=snap.docs[0];
 const data=first.data();
 result.style.display="block";
 result.innerHTML=`👤 Username<br><b>${data.username}</b><br><br>🔑 Password<br><b>${data.password}</b>`;
 await deleteDoc(doc(db,"accounts",first.id));
 claimed=true;
 claimBtn.disabled=true;
 claimBtn.textContent="تم الاستلام";
};
