

async function pincode(pin) {
    var url = `https://api.postalpincode.in/pincode/${pin}`;
    try {
        var request = await fetch(url);
        var text = await request.json();
        console.log(text)
        console.log(text[0]['Message']);

        var message = text[0]['Message'];
        var headLabel = ["PO Name", "Type", "Delivery Type", "Division", "State"]
        if (message !== "No records found") {
            console.log(text[0]['PostOffice'])
            var length = text[0]['PostOffice'].length;

            var pinArray = [];
           
            var table = document.createElement("table")
            table.className = "table table-striped"

            var thead = document.createElement("thead")
            var tbody = document.createElement("tbody")
            for (let i = 0; i < length; i++) {
                let value = text[0]['PostOffice'][i];
                pinArray.push(value['Name'], value['BranchType'], value['DeliveryStatus'], value['Division'], value['State'])
            }
            console.log(pinArray)

            var row = document.createElement("tr")
            for (let i = 0; i < 5; i++) {
                var header = document.createElement("th");
                header.textContent = headLabel[i];
                row.append(header)
            }
            thead.append(row)
            table.append(thead);
            for (i = 0; i < length; i++) {
                var row1 = document.createElement("tr");
                for (j = i * 5; j < (i + 1) * 5; j++) {
                    var column = document.createElement("td");
                    column.textContent = pinArray[j];
                    row1.append(column)

                }
                tbody.append(row1)
            }
            table.append(tbody)
            document.getElementById("pinapi").append(table)
        }
        else {
            var p = document.createElement("p");
            p.textContent ="No records found for the PIN"
            p.className  = "text-primary";
            document.getElementById("pinapi").append(p)
        }

    }
    catch (error) {
        console.log(error)
    }

}



function pincodeFinder() {
    var div = document.createElement("div");
    div.id = "pinapi"

    var h1 = document.createElement("h1");
    h1.textContent = "Post Office Finder";

    var input = document.createElement("input");

    input.placeholder = "Enter a postal code"

    input.type = "text";
    input.id = "pin"
    input.maxLength ="6";
    input.minLength ="6"

    var span = document.createElement("span");
    span.textContent = "Enter Six digit PINCODE";


    var button = document.createElement("button");
    button.className = "btn btn-primary"
    button.textContent = "Search";


    button.addEventListener("click", () => {
        let table = document.querySelectorAll("table,p");
        if(table.length>0){
            table.forEach((element)=>{
                element.remove()
            })
        }
        // let p = document.querySelector(p)

        let pin = document.getElementById("pin").value;
        // console.log(no.length)
        // console.log(typeof no.slice(0,2))
        // console.log(typeof no)
        if (pin.length < 6) {
            alert("please enter a valid pincode")
        }

        else {
            pincode(pin);
        }

    })

    div.append(h1, input, span, button);
    document.body.append(div)
}

pincodeFinder()