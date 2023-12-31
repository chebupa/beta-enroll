import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Form.module.scss'
import { IForm } from './IForm'
import PhoneInput from 'react-phone-number-input'
import Input from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './PhoneInputCustom.css'
import API from '../../API/API'

export const Form = () => {
  const { register, handleSubmit } = useForm<IForm>()
  const [ formSuccess, setFormSuccess ] = useState(false)
  const [ errorState, setErrorState ] = useState(false)
  const [ phoneNumber, setPhoneNumber ] = useState("")

  const onSubmit: SubmitHandler<IForm> = data => {
    console.log(data.email, data.phone_number, data.name, data.comment)
    API.postFormData(data.email, phoneNumber, data.name, data.comment)
    .then(res => {
      console.log(res)
      if (res) {
        setFormSuccess(true)
      } else {
        setErrorState(true)
      }
    })
  }

  return (
    <div className={ styles.Form }>
      { formSuccess ? (
        <h1> You were successfuly added to the beta program waitlist </h1>
      ) : (
        <>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <h1 className={ styles.header }> Beta enrollment </h1>

          <label>
            <p> Name </p>
            <input
              type='name'
              required
              placeholder='Name'
              { ...register('name', {required: ' '}) }
            />
          </label>

          <label>
            <p> Phone number </p>
            {/* <input
              type='tel'
              required
              placeholder='+7 (000)-000-00-00'
              { ...register('email', {
                required: ' ',
                pattern: {
                  value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
                  message: 'Please enter valid phone number'
                }
              }) }
            /> */}
            <PhoneInput
              country="RU"
              withCountryCallingCode={false}
              value={phoneNumber}
              //@ts-ignore
              onChange={setPhoneNumber}
              placeholder='+0 000 000 00 00'
            />
            {/* <Input
              defaultCountry="US"
              value={value}
              //@ts-ignore
              onChange={setValue}/> */}
          </label>

          <label>
            <p> E-Mail </p>
            <input
              type='email'
              required
              placeholder='E-Mail'
              { ...register('email', {
                required: ' ',
                pattern: {
                  value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/,
                  message: 'Please enter valid email'
                }
              }) }
            />
          </label>

          <label>
            <p> Comment </p>
            <textarea
              placeholder='Comment'
              { ...register('comment') }
            />
          </label>
          
          { errorState ? (
            <label> User with such email already exists </label>
          ) : (
            <></>
          ) }

          <button> Enroll to beta </button>
        </form>
        </>
      ) }
    </div>
  )
}
