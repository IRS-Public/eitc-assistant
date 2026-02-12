import { useEffect } from 'react'
import { useFormikContext } from 'formik'

const Touched = ({ form, showUs50PercentQuestion }) => {
  const { setFieldTouched, values } = useFormikContext()

  const fieldNames = () => {
    let filteredArr = form.filter((item) => item.show === false && item.type !== 'htmlBuilder').map((item) => item?.name)

    filteredArr = [...filteredArr]

    return filteredArr
  }

  useEffect(() => {
    fieldNames().forEach((item) => setFieldTouched(item, false, false))

    if (!showUs50PercentQuestion(values)) {
      setFieldTouched('us50Percent', false, false)
    }
  }, [values])

  return null
}

export default Touched
