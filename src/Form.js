import {useFormik} from 'formik'

const Form = () => {
    // Переменная (название любое). Присваиваем к пользовательский хук,
    // полученный из библиотеки. 
    // В качестве аргумента помещаем 
    // объект (поскольку так удобнее работать)
    const formik = useFormik({    
        // Обязательное свойство. Только так именовать и только в форме
        // объекта. Это начальные значения input    
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false,
        },
        // Обязательное свойство. Только так именовать. Только в форме
        // функции. Функция отправки формы. Т.е. что делать после нажатия
        // кнопки отправки формы. 
        // В данномслуче показываем то, что отправили. 
        // Преобразуем то, что отправляем в объект JSON (из офц. документации)
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    })

    return (
        // Вешаем на оболочку формы событие onSubmit (срабатывает при нажатии на кнопку), 
        // которое будет вызывать 
        // внутренний метод бибилиотеки formik - handleSubmit, который 
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
        // то в это самое свойство записывается то, что вводим в input (его value). Также то, что ввели в этот 
        // input записываем в values пользовательского хука 
                onChange={formik.handleChange}
        // Чтобы форма была управляемая, то в этот input записываем то, что записали в values 
                value = {formik.values.name}
            />
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
            />
            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                name="amount"
                type="number"
            />
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency">
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </select>
            <label htmlFor="text">Ваше сообщение</label>
            <textarea 
                id="text"
                name="text"
            />
            <label className="checkbox">
                <input name="terms" type="checkbox" />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            <button type="submit">Отправить</button>
        </form>
    )
}

export default Form;