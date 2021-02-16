import React,{useState} from 'react';
import { getUserData } from '../../utils/common';
 
function EstimationPage(props) {
 const [totalprice,setTotalPrice] = useState('');
    const goldPriceInGrams = useFormInput('');
    const goldWeightInGrams = useFormInput('');
    const CALCULATE_API = "https://localhost:5001/api/Jewelery/CalculatePrice";
    //const PDF_API = "https://localhost:5001/api/Jewelery/PDFDownload";
    const currentUserData = getUserData();
    const isPrivilegedUser = currentUserData.isPrivilegedUser;  
    const discount = currentUserData.discount; 
    let discountLabel;
    if(isPrivilegedUser){
      discountLabel = <div>Discount - {currentUserData.discount} % </div>
    } 
  const handleLogout = () => {    
    props.history.push('/');
  }

  const handlePrintToScreen = () => {
    window.print();
  }

  const handlePrintToFile = () => {
    window.print();
  //   const request ={
  //     method: 'POST',
  //     headers: {'Content-Type':'application/json'},
  //     body: JSON.stringify({userName: currentUserData.userName, 
  //      isPrivilegedUser: isPrivilegedUser,
  //       goldPriceInGrams: goldPriceInGrams.value ,
  //       goldWeightInGrams: goldWeightInGrams.value,
  //      totalPrice: totalprice,
  //       discount: discount })
  // }

  // fetch(PDF_API,request).then(res => res.json())
  // .then(data => {
  //   setTotalPrice(data.totalPrice);
  // })
  // .catch(error => {
  //     console.log("Something went wrong. Please try again later.");
  //   });
   }

  const handleCalculate = () => {
    const request ={
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({goldPriceInGrams: goldPriceInGrams.value,goldWeightInGrams: goldWeightInGrams.value,
          isPrivilegedUser:isPrivilegedUser,discount:discount})
    }

    fetch(CALCULATE_API,request).then(res => res.json())
    .then(data => {
      setTotalPrice(data.totalPrice);
    })
    .catch(error => {
        console.log("Something went wrong. Please try again later.");
      });
    };
 
  return (
    <div >
      <label>Welcome {currentUserData.userName}!</label><br /><br />

      <div>
      <label>Gold Price (per gram)</label> 
      <input type="text" {...goldPriceInGrams}  />
    </div>
    <div style={{ marginTop: 10 }}>
      <label>Weight (grams) </label>
      <input type="text" {...goldWeightInGrams}  />
    </div>

    <div style={{ marginTop: 10 }}>
    Total Price <input id="totalPrice" type="text" readOnly value={totalprice}/>
  </div>
{discountLabel}
<input type="button" onClick={handleCalculate} value="Calculate" />
<input type="button" onClick={handlePrintToScreen} value="Print to Screen" />
<input type="button" onClick={handlePrintToFile} value="Print to File" />
<input type="button"  value="Print to Paper" /> <br/><br/>
      <input type="button" onClick={handleLogout} value="Close" />
    </div>
  );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
  
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }  
 
export default EstimationPage;