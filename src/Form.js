import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const Input = ({lable, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <>
            <label htmlFor={props.name}>{lable}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (<div>{meta.error}</div>) : null}
        </>        
    )
}

const Сheckbox = ({lable, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'})
    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...props} {...field}/>
                {lable}
            </label>
            {meta.touched && meta.error ? (<div>{meta.error}</div>) : null}
        </>
    )
}



const СustomizableForm = () => (
        <Formik       
            initialValues = {{
                name: '',
                email: ''                            
            }}        
            validationSchema = {Yup.object({
            name: Yup.string()
                    .min(2, 'Минимум три символа')
                    .required('Обязательное поле'),
            email: Yup.string()
                    .email('Неверный формат email')
                    .required('Обязательное поле'),
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <Input  
                    lable="Ваше имя"
                    id="name"
                    name="name"
                    type="text"/>             
                <Input  
                    lable="Ваша почта"
                    id="email"
                    name="email"
                    type="email"/>
                <Сheckbox
                    lable='Соглашаетесь с политикой конфиденциальности?'
                    name="terms" 
                    type="checkbox"/>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>    
)

export default СustomizableForm;