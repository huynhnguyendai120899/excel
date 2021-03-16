let selectedFile;
// console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "data":"scd",
}]


document.getElementById('button').addEventListener("click", () => {
    this.process()
});

function process(){
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
        if(selectedFile){
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(selectedFile);
            fileReader.onload = (event)=>{
            let data = event.target.result;
            let workbook = XLSX.read(data,{type:"binary"});
            //  console.log(window);
            //  console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                //   let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                //   console.log('thông tin data : ',rowObject);
                // document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
                let process = XLSX.utils.sheet_to_row_object_array(XLSX.read(event.target.result,{type:"binary"}).Sheets[sheet]);
                // console.log('du lieu xu ly : ',process);
                this.getkeyname(process)
                document.getElementById("jsondata").innerHTML = JSON.stringify(process,undefined,4)
            });
            }
        }
}
 
function getkeyname(object1) {
    let arr = []
    object1.forEach(item => {
        let indexName = Object.values(item)
        let indexKey = Object.keys(item)
        // console.log('gia tri cua item : ',indexKey.length);
        for (let i = 3; i < indexKey.length; i++) {
            const temp = {
                "id_provider": indexName[0],
                "type": indexName[1],
                "weight": indexName[2],
                "price": indexName[i],
                "id_zone" : indexKey[i]
            }
            arr.push(temp)
        }
    });
    console.log('gia tri arr : ',arr);
    return arr
}