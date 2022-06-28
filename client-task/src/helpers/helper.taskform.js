import * as Yup from 'yup'


export const initialValues = {
    title: "",
    description: ""
}

export const validationSchema = Yup.object({
    title: Yup.string().required("El titulo es obligatorio"),
    description: Yup.string().required("La descripción es obligatorio")
  })