import {isAxiosError} from 'axios';
export const catchAsyncError = (error: any) => {
    let errorMessage = error.message

    if(isAxiosError(error)){
        const errorResponse = error.response?.data;
        if (errorResponse) {
            errorMessage = errorResponse.message 
        }

    }
    return errorMessage;
}

export default catchAsyncError;