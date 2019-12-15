import Swal from "sweetalert2";
import { async } from "q";

export default class GetProducts 
{
    constructor() {
        // this.recieveddata = [] ;
        this.url = `https://gateway.xend.tk/product/api/Product_Catalog/GetAllProductsAsync`;
    }

    productFetcher = async() =>{
       
        let url = this.url;
        fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json, `json is console logged`);
            return json; 
        }) 
        .catch(error => { 
            console.log(error)
            Swal.fire(
                {
                  type: 'error',
                  title:'Opps!!',
                  text: 'Tasks cant load please Check your internet Connection'
                }
              )
        } );
    }

//     addDataToState = async(recieveddata) =>{
//         console.log(recieveddata, `recived data is consoled`)
//         let productsRecords = this.recieveddata.data.records;
//         console.log(productsRecords, `product records is console logged`)
//         return productsRecords;
//     }
}