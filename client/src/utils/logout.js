export function logout(){
    localStorage.clear();
    window.location = "/auth";
}