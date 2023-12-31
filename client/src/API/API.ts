import axios from "axios"

export default class API {
    public static postFormData = async (email: string, phone_number: string, name: string, comment: string): Promise<any> => {
        const response = axios
            .post(`${ process.env.REACT_APP_BASE_URL }/api`, {
                email,
                phone_number,
                name,
                comment
            })
            .then(response => { return response.data })
            .catch(e => console.log(e))

        return response
    }
}