import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.length === 5


const Checkout = props => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        address: true,
        city: true,
        postalCode: true
    });

    const nameInputRef = useRef()
    const addressInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

    const confrimHandler = e => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value
        const enteredAddress = addressInputRef.current.value
        const enteredPostal  = postalInputRef.current.value
        const enteredCity = cityInputRef.current.value

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isFiveChars(enteredPostal);

        setFormInputsValidity({
            name: enteredNameIsValid,
            address: enteredAddressIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        })

        const formIsValid = enteredNameIsValid && enteredAddressIsValid && enteredCityIsValid && enteredPostalIsValid

        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredAddress,
            city: enteredCity,
            postalCode: enteredPostal
        })


    };

    return (
        <form className={classes.form} onSubmit={confrimHandler}>
            <div className={`${classes.control} ${!formInputsValidity.name && classes.invalid}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please Enter A Valid Name</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.address && classes.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={addressInputRef} />
                {!formInputsValidity.address && <p>Please Enter A Valid Address</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.postalCode && classes.invalid}`}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalInputRef} />
                {!formInputsValidity.postalCode && <p>Please Enter A Valid Postal Code</p>}

            </div>
            <div className={`${classes.control} ${!formInputsValidity.city && classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please Enter A Valid City</p>}

            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
