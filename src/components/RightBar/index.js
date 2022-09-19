import React from 'react';
import './index.scss'
import {AiOutlineCloseCircle} from  'react-icons/ai';
import AddDoc from '../AddDoc';

export default function RightBar(props) {
    

    const hide =()=>{
        document.getElementById('rightbar').classList.contains('openReightbar') &&  document.getElementById('rightbar').classList.remove('openReightbar')
        !document.getElementById('rightbar').classList.contains('closeReightbar') &&  document.getElementById('rightbar').classList.add('closeReightbar')
            
    }
  return (
    <div id='rightbar' className='rightbar d-flex flex-column p-3'>
      <div className='d-flex flex-row justify-content-start'>
      <AiOutlineCloseCircle  onClick={hide  } />
      </div>
      { Object.keys(props.affectation).length ===0  ?  (
      <div>
      <AddDoc/>
      </div>
      ) : 
      <div className=''>  list
        
        
        </div>}

   
      
        

       

 
    </div>
  )
}
