export function closeAlert(){
    console.log("closing alert...")
    const alertElement = document.getElementById("alert2");
    alertElement.style.display = "none";
}

document.querySelector(".close-btn").addEventListener("click", closeAlert);