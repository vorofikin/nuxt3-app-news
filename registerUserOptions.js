export default {
    method: "POST",
    body(data) {
        const { firstName, lastName, email, password} = data
        return {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
    }
}