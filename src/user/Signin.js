import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate } from '../auth';

const Signin = () => {
    const [values, setvalues] = useState({
        email: 'testtest@gmail.com',
        password: '123456',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;

    const handleChange = name => event => {
        setvalues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setvalues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setvalues({ ...values, error: data.error, loading: false });
                } else {
                    authenticate(
                        data, () => {
                            setvalues({
                                ...values,
                                redirectToReferrer: true
                            });
                        });
                }
            });
    };



    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );
    const showloading = () =>
        loading && (<div className='alert alert-info'>
            <h2>Loading...</h2>
        </div>);

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }
    };


    return (
        <Layout title="Sign in Page" description="Node React E-Commerce App" className="container col-md-8 offset-md-2">
            {showloading()}
            {showError()}
            {signInForm()}
            {redirectUser()}

        </Layout>

    );

};

export default Signin;