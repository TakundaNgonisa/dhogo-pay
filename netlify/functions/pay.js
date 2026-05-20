exports.handler = async (event) => {

  try{

    const body = JSON.parse(event.body);

    const phone = body.phone;

    const auth = Buffer.from(
      process.env.CONTIPAY_KEY +
      ":" +
      process.env.CONTIPAY_SECRET
    ).toString("base64");

    const response = await fetch(
      "https://api-uat.contipay.net/acquire/payment",
      {
        method:"PUT",

        headers:{
          "Content-Type":"application/json",
          "Authorization":"Basic " + auth
        },

        body:JSON.stringify({

          amount:1,

          merchantId:
            process.env.MERCHANT_ID,

          currencyCode:"USD",

          description:
            "Dhogo Pay Button",

          reference:
            "PAY_" + Date.now(),

          customer:{
            firstName:"Takunda",
            surname:"User",
            email:"test@test.com",
            cell:phone,
            countryCode:"ZW"
          },

          successUrl:
            "https://example.com/success",

          cancelUrl:
            "https://example.com/cancel",

          webhookUrl:
            "https://example.com/webhook"
        })
      }
    );

    const data =
      await response.json();

    return{

      statusCode:200,

      body:JSON.stringify({
        message:"Payment request sent",
        data:data
      })
    };

  }catch(err){

    return{

      statusCode:500,

      body:JSON.stringify({
        error:err.message
      })
    };
  }
};