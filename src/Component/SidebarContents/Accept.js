import Swal from 'sweetalert2';
import { async } from 'q';


export const dataReciever = (data) =>{
    return data;
}

export const Accept = (e, id) => {
    Swal.fire({
        title:` Are you sure?`,
        text: 'You Want To Accept This Task!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Accept!',
        cancelButtonText: 'No, keep it!'
      })
      .then((result) => {
        if (result.value) {
            let url = `http://localhost:5000/api/todo/accepttask/${id}`;

            
            fetch(url,{
                method: 'Put'
            })
            .then(response => response.json())
            .then(json => {
                    console.log(json, `This is the json respone`);
                    Swal.fire({
                        title: 'Accepted!',
                        text: 'Your Task is Currently Ongoing.',
                        type: 'success'
                    }) 
                   dataReciever(json);
                   
            }) 
            .catch(error => { 
                console.log(error, `Error is console logged`)
                Swal.fire(
                        {
                          type: 'error',
                          title:'Opps!!',
                          text: 'This Task Cant Be Acceptedd Please Check Your Internet Connection'
                        }
                      )
               
            } );
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your Task is still Pending ',
                'error'
              )
        }
    }
    )
}
