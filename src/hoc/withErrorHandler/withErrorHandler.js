import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
            state = {
                error: null
            }
            componentWillMount () {
                this.reqInterceptor = axios.interceptors.request.use(req => {
                    this.setState({error: null});
                    return req;
                });
                this.resInceptor = axios.interceptors.response.use(null, error => {
                    this.setState({error: error});
                });
            }

            errorConfirmedHandler = () => {
                this.setState({error: null})
            }

            componentWillUnmount() {

                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
            }

            render () {
                return (
            <Auxiliary>
                <Modal show={this.state.error} 
                clicked={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message: null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Auxiliary>
        );
      }
    }

}

export default withErrorHandler;