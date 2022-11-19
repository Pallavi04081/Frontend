import {Link } from 'react-router-dom';


const Opening = ()=>{
       
    return(
        <>
        <div style={{width:"50%",height:"350px",border:"1px solid #85194A",margin:"auto",marginTop:"5%",display:"flex",flexDirection:"row"}}>
            <div style={{width:"50%",height:"100%"}}>
             <img src="instaclone.png" style={{width:"100%",height:"100%"}}/>
            </div>
            <div style={{width:"50%",height:"100%",background:"#E45595"}}>
              <div style={{width:"60%",height:"60%",margin:"auto",marginTop:"30%",marginLeft:"30%"}}>
             <h6 style={{fontSize:"25px"}}>10x Team 04</h6>
             <Link to="/login" style={{marginLeft:"35px"}}><button class="btn btn-default" style={{borderColor:"white",marginTop:"10px"}}>Enter</button></Link>
             </div>
            </div>
        </div>
        </>
    )

}

export default Opening;