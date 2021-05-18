import React, {useEffect}from 'react';

const Login = () => {

    const api_url = `http://18.222.78.10:8110/uaa/users`;

    useEffect(() => {
        async function fetchPostList(){
            try {
                const requestUrl = api_url;
                const response = await fetch(requestUrl);
                //console.log(response);
            
                const responseJSON = await response.json();
                
                //console.log(responseJSON);
                

                //Clear data to get Username Only
                let newUsersName = [];
                for(let i = 0; i < responseJSON.length; i++){
                    newUsersName.push(responseJSON[i].username)
                 }
                 
                 //console.log(newUsersName);

            } catch (error) {
                console.log('Failed to Fetch', error);
            } 
        }
        fetchPostList();
    
    }, []);

    return(
        <div className="login-form w-25 mx-auto">
            <form >
                <h2 className="text-center">Log in</h2>       
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" required="required"/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" />
                </div>
                <p style={{color:'red'}}></p>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Log in</button>
                </div>
                <div className="clearFix">
                    <label className="float-left form-check-label"><input type="checkbox"/> Remember me</label>
                    <a href="forgotPass" className="float-right">Forgot Password?</a>
                </div>        
            </form>
            <p className="text-center"><a href="createAcc">Create an Account</a></p>
        </div>
    )
}

export default Login;