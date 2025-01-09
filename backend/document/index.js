module.exports=({concId,name,DOB,from,to,via,clas,period,college,collegeId,createdAt})=>{
    const today=new Date();
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            body{margin-top:10px;
    background-color:#eee;
    }
    
    .card {
        box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
    }
    .card {
        position: relative;
        display:flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 0 solid rgba(0,0,0,.125);
        border-radius: 1rem;
    }
    .id{
        display: flex;
        position: relative;
        top:50px;
        left:60%
    }
    .card-body{
        margin: 15px;
        margin-top: 0px;
    }
    span{
        font-weight:200
    }
    .tabular{
        border: 1px solid black;
      border-collapse: collapse;
      width: 40%;
      text-align: center;
      margin-left:auto;
    margin-right: auto;
    }
    .tabular th{
        padding: 20px;
        border: 1px solid black;
      border-collapse: collapse;
    }
    .tabular td{
        padding: 20px;
        border: 1px solid black;
      border-collapse: collapse;
      font-size: 18px;
    }
    th{
        font-size: 18px;
    }
    td{
        font-size:18px;
    }
    
        </style>
       
    </head>
    <body>
        
        <div class="container">
            <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="invoice-title">
                                    <h4 class="id">Application No:<span>${concId}</span></h4>
                                    <div class="mb-4">
                                       <h1 class="head">Indian Railway</h1>
                                    </div>
                                    <div class="text-muted">
    
                                        <p class="mb-1"><i class="uil uil-envelope-alt me-1"></i> xyz@987.com</p>
                                        <p><i class="uil uil-phone me-1"></i>Date Of Issue:${createdAt}</p>
                                    </div>
                                </div>
            
                                <hr class="my-4">
            
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="text-muted">
                                           <table style="text-align: left;" cellspacing="15">
                                           <tr>
                                            <th>ID:</th>
                                            <td>${collegeId}</td>
                                        </tr> 
                                           <tr>
                                                <th>Applicatnt:</th>
                                                <td>${name}</td>
                                            </tr>
                                            <tr>
                                                <th>Institute:</th>
                                                <td>${college}</td>
                                            </tr>
                                            <tr>
                                                <th>D.O.B:</th>
                                                <td>${DOB}</td>
                                            </tr>
                                           </table>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                    <table class="tabular">
                                        <thead>
                                        <tr>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Via</th>
                                            <th>Class</th>
                                            <th>Period</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><h5>${from}</h5></td>
                                                <td><h5>${to}</h5></td>
                                                <td><h5>${via}</h5></td>
                                                <td><h5>${clas}</h5></td>
                                                <td><h5>${period}</h5></td>
                                        
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div>
                                        <h4>Note:</h4>
                                        <p>Available only between Station nearest to Student's residence and Station nearest to the College/School</p>
                                        <p>This certificate will be only valid for 3 days including the date of issue</p>
                                        <p>No fresh concession certificate should be granted by the School/College authorities to any of their students in the event of his/her season ticket being lost during the carency of the previous certificate. Such students must purchase a fresh season ticket of tariff fares during that period</p>
                                    </div> 
                                </div>
                                <!-- end row -->
                                
                                <div>
                                    <h5 class="font-size-15">Computer Generated</h5>
                                    <p>${`${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}.`}</p>
                                </div>
                            </div>
                        </div>
                    </div><!-- end col -->
                </div>
            </div>
    </body>
    </html>`
}