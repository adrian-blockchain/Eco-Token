import React from "react";
import {Component} from "react";


export class ErrorBoundary extends Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    static getDerivdedStateFromError(error:any){
        return {
            hasError: true
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log('Logging', error, errorInfo)
    }
    // @ts-ignore
    render() {
        if (this.state.hasError){
            return <div><h3>Something went wrong, have you activated gps localisation in your camera ?</h3></div>

        }
        return this.props.children
    }
}