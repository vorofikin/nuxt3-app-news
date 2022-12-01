export default {
    firstNameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        v => (v && v.length >= 5) || 'First name should not be less than 5 characters',
    ],
    lastNameRules: [
        v => !!v || 'Last name is required',
        v => (v && v.length <= 10) || 'Last name must be less than 20 characters',
        v => (v && v.length >= 5) || 'Last name should not be less than 5 characters',
    ],
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]
}