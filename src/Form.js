import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
                <label htmlFor="name">Ваше имя</label>
                <Field 
                    id="name"
                    name="name"
                    type="text"
                />  
                <ErrorMessage name="name" component="div" />  
                <label htmlFor="email">Ваша почта</label>
                <Field 
                    id="email"
                    name="email"
                    type="email"                
                />
                <ErrorMessage name="email" component="div" /> 
                <button type="submit">Отправить</button>
            </Form>
        </Formik>    
)

export default СustomizableForm;