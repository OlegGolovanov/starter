import {useFormik} from 'formik'
import * as Yup from 'yup';


//----------Не обязательно. 1 вариант валидации. Ручной. Без исп. библиотек.---------//. 
// По окончании валидации
// в validate запишется объект, например, errors {name: "Обязательное поле"}.
// Этот объект помещаем в пользовательский хук
// const validate=values => {
    // Создаем пустой объект, который при валидации ниже будет наполяться 
    // свойствами, например - name, значениями - "Обязательное поле"
//     const errors = {};
    // Это свойство и значение будет браться из пользовательского хука, когда 
    // помещенная туда функция валидации validate будет вызываться через событие 
    // blure
//     if (!values.name) {
//         errors.name = 'Обязательное поле';
//     }
//     if  (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//     ) {
//       errors.email = 'Неправильный адрес email';
//     }
//     // Возвращаем результат (объект с ошибками или пустой - без ошибок) в переменную validate
//     return errors;
//   }

const Form = () => {
    // Переменная (название любое). Присваиваем к ней пользовательский хук,
    // полученный из библиотеки. 
    // Внего в качестве аргумента помещаем 
    // объект с его настройками.
    const formik = useFormik({    
        // Обязательное свойство. Только так именовать и только в форме
        // объекта. Некое подобие состояния, в которое будут записываться
        // введенное в input    
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false,
        },
        // 1 вариант валидации.
        // Принимает значения инпутов формы и возращает объект с ошибками или пустой объект без ошибок
        // validate: validate,
        // 2 вариант валидации.
        // При помощи импортируемой библиотеки Yup
        // Принцип действия тот же как при 1 варианте.
        // Свойство, которое принимает значения инпутов формы и возращает 
        // объект с ошибками или пустой объект без ошибок
        // Именовать свойство только validationSchema
        validationSchema: Yup.object({
                //  проверяем строку
            name: Yup.string()
                    // Минимум два символа. Если не проходит возвращается
                    // строка, которую прописываем далее.
                    .min(2, 'Минимум три символа')
                    // Проверка на заполненность
                    .required('Обязательное поле'),
            email: Yup.string()
                    .email('Неверный формат email')
                    .required('Обязательное поле'),
        }),
        // Обязательное свойство. Только так именовать. Только в форме
        // функции. Функция отправки формы. Т.е. что делать после нажатия
        // кнопки отправки формы. 
        // В данном случе атрибут values впитывет все данные из input и показывает их в consile.log. 
        // Т.о. values после введения данных в input будет таким же объектом, как initialValues
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    })
    return (
        // Вешаем на оболочку формы событие onSubmit (срабатывает при нажатии на кнопку), 
        // которое будет вызывать внутренний метод бибилиотеки formik - handleSubmit, который 
        // будет вызывать созданный нами в пользовательском хуке метод 
        // onSubmit. Этот метод будет впитывать в себя все значения инпутов,
        // содержащихся в этой  форме
        <form form className="form" onSubmit={formik.handleSubmit}>
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            <input
                id="name"
                name="name"
                type="text"
        // Когда что-то вводим в этот input, то срабатывает событие onChange, которое вызывает
        // внутренний метод бибилиотеки handleChange. Если этот метод обнаруживает, что 
        // у этого input такое же имя name="name" как и свойство в initialValues (в нем создал одноименное свойство),
        // то в это самое свойство записывается то, что вводим в input (его value). Так же то, что ввели в этот 
        // input записываем в values пользовательского хука 
                onChange={formik.handleChange}
        // Чтобы форма была управляемая, то в этот input записываем то же, что передали в values 
                value = {formik.values.name}
        // Через событие onBlur запуск функции validate с валидацией 
        // только через внутренний метод handleBlur и 
                onBlur = {formik.handleBlur}
                // {...formik.getFieldProps('name')} - сокращенная запись всех этих событий

            />
        {/*Если есть ошибка && и взаимодействие было только с этим инпутом 
        (внутри библиотеки объект touched), то покажи сообщение об ошибке.
        Иначе сообщение об ошибке будет на всех инпутах, а не на том, на котором
        сработало*/}
            {formik.errors.name && formik.touched.name 
            ? formik.errors.name 
            : null}
            <label htmlFor="email">Ваша почта</label>
        {/* //---- для остальных input действия идентичны---- */}
            <input
                id="email"
                name="email"
                type="email"
            />
            {formik.errors.email && formik.touched.email 
            ? formik.errors.email 
            : null}
            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                name="amount"
                type="number"
                onChange={formik.handleChange}
                value = {formik.values.amount}
            />
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                onChange={formik.handleChange}
                value = {formik.values.currency}>                 
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </select>
            <label htmlFor="text">Ваше сообщение</label>
            <textarea 
                id="text"
                name="text"
                onChange={formik.handleChange}
                value = {formik.values.text}
            />
            <label className="checkbox">
                <input name="terms" 
                type="checkbox" 
                onChange={formik.handleChange}
                value = {formik.values.terms}
                />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            <button type="submit">Отправить</button>
        </form>
    )
}

export default Form;