import { useEffect } from 'react'
import { useFormikContext } from 'formik'

const Touched = ({ form }) => {
  const { setFieldTouched, values } = useFormikContext()

  const fieldNames = () => {
    let filteredArr = form.filter((item) => item.show === false && item.type !== 'htmlBuilder').map((item) => item?.name)

    filteredArr = [...filteredArr]

    return filteredArr
  }

  useEffect(() => {
    fieldNames().forEach((item) => setFieldTouched(item, false, false))
  }, [values])

  return null
}

export default Touched
