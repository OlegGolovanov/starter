import {useFormik} from 'formik'


const Form = () => { 
    const formik = useFormik({       
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false,
        },        
        validate: validate,       
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    })
    return (       
        <form form className="form" onSubmit={formik.handleSubmit}>
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            <input
                id="name"
                name="name"
                type="text"       
                onChange={formik.handleChange}
                value = {formik.values.name}
                onBlur = {formik.handleBlur}

            />      
            {formik.errors.name && formik.touched.name 
            ? formik.errors.name 
            : null}
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value = {formik.values.email}
                onBlur = {formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email 
            ? formik.errors.email 
            : null}            
            <button type="submit">Отправить</button>
        </form>
    )
}

const validate=values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Обязательное поле';
    }
    
    if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    )
        {errors.email = 'Неправильный адрес email';
    }
    return errors;
}

export default Form;