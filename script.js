async function payNow(){

  const phone =
    document.getElementById("phone").value;

  const status =
    document.getElementById("status");

  if(phone === ""){

    status.innerText =
      "Please enter your EcoCash number";

    return;
  }

  status.innerText =
    "Sending payment request...";

  try{

    const response = await fetch(
      "/.netlify/functions/pay",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          phone:phone
        })
      }
    );

    const data = await response.json();

    if(data.error){

      status.innerText =
        "Error: " + data.error;

    }else{

      status.innerText =
        "Payment request sent successfully!";
    }

  }catch(err){

    status.innerText =
      "Connection error";
  }
}