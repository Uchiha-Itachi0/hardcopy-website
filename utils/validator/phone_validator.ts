const validatePhone = (phoneNumber: string) => {
    const phoneRegex = /^\d{10}$/;

    return phoneRegex.test(phoneNumber);
};

export default validatePhone;
