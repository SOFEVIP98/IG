import {auth,provider,db,signInWithPopup,onAuthStateChanged,collection,getDocs,doc,getDoc,setDoc,deleteDoc,serverTimestamp} from "./firebase.js";

const loginBtn=document.getElementById("loginBtn");
const claimBtn=document.getElementById("claimBtn");
const status=document.getElementById("status");
const result=document.getElementById("result");

loginBtn.onclick=()=>signInWithPopup(auth,provider).catch(e=>alert(e.message));

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

claimBtn.onclick=async()=>{
 const user=auth.currentUser;
 if(!user){alert("سجل الدخول أولاً");return;}

 const claimRef=doc(db,"claims",user.uid);
 const claimSnap=await getDoc(claimRef);

 if(claimSnap.exists()){
   const last=claimSnap.data().lastClaim?.toMillis?.()??0;
   const wait=48*60*60*1000;
   const remain=last+wait-Date.now();
   if(remain>0){
      const hrs=Math.ceil(remain/3600000);
      result.style.display="block";
      result.innerHTML=`⏳ يمكنك الاستلام بعد ${hrs} ساعة`;
      return;
   }
 }

 const snap=await getDocs(collection(db,"accounts","accounts","accounts"));
 if(snap.empty){
   result.style.display="block";
   result.innerHTML="❌ نفذت الحسابات، راجع لاحقًا.";
   return;
 }

 const first=snap.docs[0];
 const data=first.data();

 await setDoc(claimRef,{lastClaim:serverTimestamp()});
 await deleteDoc(doc(db,"accounts","accounts","accounts",first.id));

 result.style.display="block";
 result.innerHTML=`👤 Username<br><b>${data.username}</b><br><br>🔑 Password<br><b>${data.password}</b>`;
 claimBtn.disabled=true;
};
