import React, { Component } from "react";
import Swal from "sweetalert2";

export default class Delete extends Component {

    responseSender = (response) =>{
        console.log(response, `RESPONSESENDER'S response is consoled`);
        if(response.status_code == 200)
        {
          console.log(response.Message, `RESONSE Successful Message is consoled`)
          Swal.fire(
            {
              type: 'success',
              title:'Sorry',
              text: `${response.message}`
            })
          
        }
        else if(response.status_code == 400)
        {
          console.log(response.Message, `Response error message`)
          Swal.fire(
            {
              type: 'info',
              title:'Sorry',
              text:  `${response.Message}`
            })
        }
    
    
      }
    onDelete = ( productId, stateUpdater) => {

        Swal.fire({
                title: 'Are you sure You Want To Delete?',
                text: 'You will not be able to recover this Product again!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
        })
        .then((result) => {
            if (result.value) {

                let url = `https://gateway.xend.tk/product/api/Product_Catalog/DeleteProduct`;
                let data = JSON.stringify([productId])

                if(data){
                    fetch(url,{
                        method: 'post',
                        body: data,
                        headers:{
                          'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(json => {
                        console.log(json, "This is the json response");
                        this.responseSender(json);
                        stateUpdater(productId);
                    })
                    .catch(error => {
                        console.log(error)
                        Swal.fire(
                          {
                            type: 'error',
                            title:'Sorry',
                            text: `Something Went Wrong!`
                          })
                    })  
                }
                else{
                    Swal.fire(
                        {
                          type: 'error',
                          title:'Sorry!',
                          text: 'Something Went Wrong'
                        }
                    )
                }
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your Request Has Been Cancelled',
                    'info'
                )
            }
        })
    }
}