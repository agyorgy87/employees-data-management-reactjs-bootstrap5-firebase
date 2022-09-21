export default function Validate (values) {

    let errors = {error: false};

    if(!values.fullName) {
        errors.fullName = "Please enter the Name"
        errors.error = true
    }

    if(!values.mobile) {
        errors.mobile = "Please enter the Mobile number"
        errors.error = true
    }else if(values.mobile.length !== 9){
        errors.mobile = "Invalid Mobile Number"
        errors.error = true
    }else if(!/^20/.test(values.mobile) && !/^30/.test(values.mobile) && !/^70/.test(values.mobile)){
        errors.mobile = "Starts the phone number with service provider. Example: 304567456 (Telekom)"
        errors.error = true
    }
    
    if(!values.email){
        errors.email = "Please enter the Email Address"
        errors.error = true
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "Invalid format"
        errors.error = true
    }

    if(values.rank === "None") {
        errors.rank = "Please enter the rank"
        errors.error = true
    } 

    return errors;
}