(() => {
 const cfg=window.SCISPHERE_AUTH_CONFIG||{};
 const byId=id=>document.getElementById(id);
 const status=byId('accountStatus'),guest=byId('accountGuest'),dashboard=byId('accountDashboard');
 const setStatus=(message,state='info')=>{status.textContent=message;status.dataset.state=state};
 const setupReady=!!(cfg.supabaseUrl&&cfg.supabaseAnonKey&&window.supabase?.createClient);
 if(!setupReady){
  setStatus('Account service is not connected yet. Create a Supabase project and add its Project URL and public publishable/anon key to auth-config.js. No password entered here will be saved or sent until setup is complete.');
  document.querySelectorAll('#accountGuest button[type="submit"]').forEach(button=>button.disabled=true);
  return;
 }
 const sb=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey,{auth:{autoRefreshToken:true,persistSession:true,detectSessionInUrl:true,flowType:'pkce'}});
 const redirectUrl=location.origin+location.pathname+'#account';
 let activeUser=null,pendingEmail='';
 const setPanel=(mode)=>{
  byId('loginForm').hidden=mode!=='login';byId('registerForm').hidden=mode!=='register';byId('forgotForm').hidden=mode!=='forgot';
  byId('verificationNotice').hidden=true;
  document.querySelectorAll('[data-auth-tab]').forEach(b=>{const on=b.dataset.authTab===mode;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});
 };
 function updateProgressSummary(){
  let saved={lessons:{}};
  try{saved=JSON.parse(localStorage.getItem('urx96-progress-v1'))||saved}catch{}
  const done=Object.keys(saved.lessons||{}).length;
  const subjects=window.URX96_CONTENT||[];
  const total=subjects.reduce((n,s)=>n+(s.modules||[]).reduce((m,x)=>m+(x.lessons||[]).length,0),0);
  byId('dashboardProgress').textContent=Math.min(done,total)+' / '+total;
 }
 function showDashboard(user){
  activeUser=user||null;guest.hidden=!!user;dashboard.hidden=!user;
  if(!user)return;
  const name=user.user_metadata?.display_name?.trim()||'learner';
  byId('dashboardName').textContent=name;byId('dashboardEmail').textContent=user.email||'';
  byId('profileName').value=user.user_metadata?.display_name||'';
  byId('verificationState').textContent=user.email_confirmed_at?'Email verified':'Email verification pending';
  byId('saveProgress').checked=localStorage.getItem('scisphere-save-progress')!=='false';
  updateProgressSummary();
 }
 document.querySelectorAll('[data-auth-tab]').forEach(b=>b.addEventListener('click',()=>setPanel(b.dataset.authTab)));
 byId('showForgot').addEventListener('click',()=>{byId('forgotEmail').value=byId('loginEmail').value;setPanel('forgot')});
 byId('backToLogin').addEventListener('click',()=>setPanel('login'));
 byId('loginForm').addEventListener('submit',async e=>{
  e.preventDefault();const button=e.submitter;button.disabled=true;
  const {data,error}=await sb.auth.signInWithPassword({email:byId('loginEmail').value.trim(),password:byId('loginPassword').value});
  button.disabled=false;
  if(error){setStatus('Log in failed. Check your email and password, and verify your email address if you just registered.','error');return}
  setStatus('You are logged in.','success');showDashboard(data.user);
 });
 byId('registerForm').addEventListener('submit',async e=>{
  e.preventDefault();const button=e.submitter;button.disabled=true;
  const email=byId('registerEmail').value.trim();pendingEmail=email;
  const {data,error}=await sb.auth.signUp({email,password:byId('registerPassword').value,options:{data:{display_name:byId('registerName').value.trim()},emailRedirectTo:redirectUrl}});
  button.disabled=false;
  if(error){setStatus(error.message||'The account could not be created. Please try again.','error');return}
  if(data.session){setStatus('Account created and email verified. You are logged in.','success');showDashboard(data.user)}
  else{byId('verificationNotice').hidden=false;setPanel('register');byId('verificationNotice').hidden=false;setStatus('Account created. Check your email for a verification link before logging in.','success')}
 });
 byId('resendVerification').addEventListener('click',async()=>{
  if(!pendingEmail){setStatus('Create your account again to request a verification email.','error');return}
  const {error}=await sb.auth.resend({type:'signup',email:pendingEmail,options:{emailRedirectTo:redirectUrl}});
  setStatus(error?error.message:'If the address can receive a verification email, a new message has been requested.',error?'error':'success');
 });
 byId('forgotForm').addEventListener('submit',async e=>{
  e.preventDefault();const button=e.submitter;button.disabled=true;
  const {error}=await sb.auth.resetPasswordForEmail(byId('forgotEmail').value.trim(),{redirectTo:redirectUrl});
  button.disabled=false;
  setStatus(error?error.message:'If this address belongs to an account, a password-reset email has been requested.',error?'error':'success');
 });
 byId('passwordRecoveryForm').addEventListener('submit',async e=>{
  e.preventDefault();const button=e.submitter;button.disabled=true;
  const {data,error}=await sb.auth.updateUser({password:byId('newPassword').value});button.disabled=false;
  if(error){setStatus(error.message,'error');return}
  byId('passwordRecoveryForm').hidden=true;byId('newPassword').value='';setStatus('Password updated. You can continue using your account.','success');if(data.user)showDashboard(data.user);
 });
 byId('profileForm').addEventListener('submit',async e=>{
  e.preventDefault();const button=e.submitter;button.disabled=true;
  const {data,error}=await sb.auth.updateUser({data:{display_name:byId('profileName').value.trim()}});
  button.disabled=false;
  if(error){setStatus(error.message,'error');return}
  setStatus('Your profile was updated.','success');showDashboard(data.user);
 });
 byId('saveProgress').addEventListener('change',e=>{
  const enabled=e.target.checked;
  try{localStorage.setItem('scisphere-save-progress',String(enabled));if(!enabled)localStorage.removeItem('urx96-progress-v1')}catch{}
  window.dispatchEvent(new CustomEvent('scisphere:progress-privacy-changed',{detail:{enabled}}));
  updateProgressSummary();
  setStatus(enabled?'Lesson progress will be saved in this browser.':'Saved lesson progress was cleared from this browser.','success');
 });
 byId('logoutButton').addEventListener('click',async()=>{
  const {error}=await sb.auth.signOut();
  if(error){setStatus('Could not log out. Please try again.','error');return}
  byId('loginPassword').value='';showDashboard(null);setPanel('login');setStatus('You are logged out.','success');
 });
 const dialog=byId('deleteAccountDialog');
 byId('openDeleteAccount').addEventListener('click',()=>{byId('deleteConfirmation').value='';byId('deletePassword').value='';byId('deleteStatus').textContent='';dialog.showModal()});
 byId('cancelDeleteAccount').addEventListener('click',()=>dialog.close());
 byId('deleteAccountForm').addEventListener('submit',async e=>{
  e.preventDefault();const button=e.submitter;
  if(byId('deleteConfirmation').value.trim()!=='DELETE'){byId('deleteStatus').textContent='Type DELETE exactly to confirm.';return}
  if(!activeUser?.email){byId('deleteStatus').textContent='Your account session expired. Log in again and retry.';return}
  button.disabled=true;byId('deleteStatus').textContent='Verifying your password…';
  const {data:reauth,error:reauthError}=await sb.auth.signInWithPassword({email:activeUser.email,password:byId('deletePassword').value});
  if(reauthError||!reauth.session){button.disabled=false;byId('deleteStatus').textContent='Password verification failed. Your account was not deleted.';return}
  byId('deleteStatus').textContent='Deleting account…';
  try{
   const response=await fetch('/api/account/delete',{method:'POST',headers:{Authorization:'Bearer '+reauth.session.access_token}});
   const result=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(result.error||'The account could not be deleted. Please try again.');
   await sb.auth.signOut();dialog.close();showDashboard(null);setPanel('login');byId('deletePassword').value='';setStatus('Your account was deleted. Browser-local learning activity, suggestions, and reports remain on this device.','success');
  }catch(error){byId('deleteStatus').textContent=error.message}
  button.disabled=false;
 });
 sb.auth.onAuthStateChange((event,session)=>{
  if(session?.user)showDashboard(session.user);
  else if(event==='SIGNED_OUT')showDashboard(null);
  if(event==='PASSWORD_RECOVERY'){guest.hidden=false;dashboard.hidden=true;byId('loginForm').hidden=true;byId('registerForm').hidden=true;byId('forgotForm').hidden=true;byId('passwordRecoveryForm').hidden=false;setStatus('Choose a new password for your account.')}
 });
 sb.auth.getSession().then(({data,error})=>{
  if(error){setStatus('Could not restore your account session. Please log in again.','error');return}
  if(data.session?.user)showDashboard(data.session.user);
  else showDashboard(null);
 });
})();
