var NameBookInput = document.getElementById("SiteName");
var URLBookInput = document.getElementById("SiteURL");
var ArrayBook = []
if(localStorage.getItem("DbBook") != undefined){
    ArrayBook = JSON.parse(localStorage.getItem("DbBook"))
}
URLBookInput.addEventListener('input',DsplayCheckUrlBook)
document.getElementById('btSubmit').addEventListener('click',function (){
    if(CheckUrlBook()){
        SeveBook()
    }
})
document.getElementById('tablebody').addEventListener('click',function(e){
    elm = e.target
    if(elm.hasAttribute('indexDelBook')){
        DeleteBook(elm.getAttribute('indexDelBook'))
    }
})
function SeveBook(){
    for(var i =0;i < ArrayBook.length ;i++){
        if(getBook().NameBook == ArrayBook[i].NameBook){
            console.log(ArrayBook[i].NameBook)
            document.getElementById('NameRegistered').classList.replace('d-none','d-block')
            return false
        }
    }
    document.getElementById('NameRegistered').classList.replace('d-block','d-none')
    ArrayBook.push(getBook())
    UpdataDbBook();
    ClearData()
    DsplayBook()
    return true
}
function UpdataDbBook(){
    localStorage.setItem("DbBook",JSON.stringify(ArrayBook))
}
function getBook(){
    var user = {
        NameBook:NameBookInput.value,
        URLBook:URLBookInput.value
    }
    return user
}
function CheckUrlBook(){
    var rg = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    if(rg.test(getBook().URLBook)){
        return true
    }
    else{
        return false
    }
}
function DsplayCheckUrlBook(){
    if(CheckUrlBook()){
        URLBookInput.classList.remove("is-invalid")
        document.getElementById("invalid").classList.replace("d-block","d-none")
        URLBookInput.classList.add("is-valid")
    }else{
        document.getElementById("invalid").classList.replace("d-none","d-block")
        URLBookInput.classList.remove("is-valid")
        URLBookInput.classList.add("is-invalid")
    }
}
function ClearData(){
    NameBookInput.value = ""
    URLBookInput.value = ""
}
function DsplayBook(){
    var Books = '';
    for(var i = 0;i < ArrayBook.length;i++){
        Books += ` <tr class="BorderBottomT">
                                                            <td class="py-2">${i + 1}</td>
                                                            <td class="py-2">${ArrayBook[i].NameBook}</td>
                                                            <td class="py-2"><a href="${ArrayBook[i].URLBook}"><button class="btn btn-outline-primary px-4"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                                                            <td class="py-2"><button indexDelBook="${i}" class="btn btn-outline-danger px-4 BtDelete"><i indexDelBook="${i}" class="fa-regular fa-trash-can BtDelete"></i> Delete</button></td>
                                                            </tr>`
    }
    document.getElementById('tablebody').innerHTML = Books; 
}
function DeleteBook(index){
    ArrayBook.splice(index,1)
    UpdataDbBook();
    DsplayBook();
}
DsplayBook();