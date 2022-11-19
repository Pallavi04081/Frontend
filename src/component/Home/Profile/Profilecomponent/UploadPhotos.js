
const UploadPhotos =({photos})=>{
    return(
        <>
        <div className="row row-cols-6" style={{marginLeft:"30px",width:"97%"}}>
         {
          photos ? 
          photos.map((element)=>{
            return(
              <>
              <div class="col"style={{marginTop:"10px"}}>
              <img src={`${element.img}`} style={{width:"100%",height:"70%"}}/>
              </div>
              </>
            )
          }) :
          <div></div>
         }
       </div>
        </>
    )
}

export default UploadPhotos;