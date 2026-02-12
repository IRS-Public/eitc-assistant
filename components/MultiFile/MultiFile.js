import { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { Field, ErrorMessage } from 'formik'
import clsx from 'clsx'
import { sum } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import TextError from '../TextError'
import Spinner from '../Spinner'
import Button from '../Button'

const baseStyle = {
  alignItems: 'center',
  borderStyle: 'dashed',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const activeStyle = {
  borderColor: '#087591'
}

const acceptStyle = {
  borderColor: '#2E8540'
}

const rejectStyle = {
  borderColor: '#D11242'
}

const formatSizeUnits = (size) => {
  let bytes = size
  if (bytes >= 1073741824) {
    bytes = `${(bytes / 1073741824).toFixed(2)} GB`;
  } else if (bytes >= 1048576) {
    bytes = `${(bytes / 1048576).toFixed(2)} MB`;
  } else if (bytes >= 1024) {
    bytes = `${(bytes / 1024).toFixed(2)} KB`;
  } else if (bytes > 1) {
    bytes += ' bytes';
  } else if (bytes === 1) {
    bytes += ' byte';
  } else { bytes = '0 bytes'; }
  return bytes;
}

const MultiFile = ({
  name,
  className,
  onFileDrop,
  buttonText,
  onRemove,
  form,
  successMessage = 'Success, all files passed security check.'
}) => {
  const { values, setFieldValue, errors } = form
  const getStatus = values[name].map((file) => file.status)
  const isSomeUnknown = getStatus.some((status) => status === 'unknown')
  const isSomeFailed = getStatus.some((status) => status === 'failed')
  const fileCount = values[name].length
  const errorCount = Object.keys(errors).length
  const totalMB = formatSizeUnits(sum(values[name].map(({ size }) => size)))
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    disabled: isSomeUnknown || isSomeFailed,
    onDrop: async (acceptedFiles) => {
      const { setFieldError, setFieldTouched, setErrors } = form
      onFileDrop(
        form.values,
        acceptedFiles,
        form.setFieldValue,
        setFieldError,
        setFieldTouched,
        setErrors
      )
    }
  })

  const handleRemoveFile = async (fileIndex, status) => {
    const updatedFiles = values[name]
    await Promise.all([
      updatedFiles.splice(fileIndex, 1),
      setFieldValue('files', updatedFiles),
      onRemove(fileIndex, status)
    ]).then(() => {
      if (fileCount === 1 && status === 'failed') {
        document.getElementById(`${name}-error-messages`).focus()
      }
      if (fileCount === 1 && status === 'success') {
        document.getElementById(name).focus()
      }
      if (fileCount > 1 && status === 'failed') {
        document.getElementById('remove-file-1').focus()
      }
    })
  }

  const thumbs = values[name]?.map((file, fileIndex) => {
    const { status, size, message } = file
    let icon
    let removeButtonLabel

    switch (status) {
      case 'success':
        icon = (
          <div className={clsx('fade-in text-green-500 my-auto ')}>
            <FontAwesomeIcon
              id="success-moderation"
              icon={faCheckCircle}
              className="pointer-events-none text-green-500 fa-2x"
              height="1em"
              width="1em"
              focusable={false}
            />
          </div>
        )
        removeButtonLabel = `Remove accepted file ${fileIndex} - ${file.name}`
        break
      case 'failed':
        icon = (
          <div className={clsx('fade-in text-green-500 my-auto')}>
            <FontAwesomeIcon
              id="failed-moderation"
              icon={faTimesCircle}
              className="pointer-events-none text-red-500 fa-2x"
              height="1em"
              width="1em"
              focusable={false}
            />
          </div>
        )
        removeButtonLabel = `Remove rejected file ${fileIndex} - ${file.name}`
        break
      default:
        icon = (
          <div className={clsx('fade-in text-green-500 my-auto')}>
            <Spinner color="#002346" size="2rem" />
          </div>
        )
    }

    return (
      <div
        key={file.name}
        data-testid={`file-${fileIndex + 1}`}
        className={
          clsx([
            'bg-gray-400 w-full',
            'flex flex-row box-border',
            'mb-1 p-2 rounded-l overflow-hidden'
          ])}
      >
        {icon}

        <div className={clsx('ml-4 flex-grow')}>
          <div data-testid={`file-name-${fileIndex + 1}`}>{file.name}</div>
          <div data-testid={`file-size-${fileIndex + 1}`}>{formatSizeUnits(size)}</div>
          <div data-testid={`file-message-${fileIndex + 1}`} className={clsx(status === 'failed' && 'text-red-500')}>{message}</div>
        </div>
        <div>
          <button
            id={`remove-file-${fileIndex + 1}`}
            disabled={isSomeUnknown}
            data-testid={`remove-file-${fileIndex + 1}`}
            aria-label={removeButtonLabel}
            className={clsx(
              isSomeUnknown && 'hidden',
              'bg-blue-500 text-white p-1 rounded-sm text-sm'
            )}
            onClick={() => handleRemoveFile(fileIndex, status)}
          >Remove
        </button>
        </div>
      </div>
    )
  })

  const fileBoxMessages = () => {
    if (isSomeUnknown) {
      return `Upload and scanning in progress, this may take a minute to process. ${fileCount} file${fileCount > 1 ? 's' : ''} selected. Total size: ${totalMB}`
    }
    if (!isSomeUnknown && isSomeFailed) {
      return `Please remove and upload a new file. ${fileCount} file${fileCount > 1 ? 's' : ''} selected. Total size: ${totalMB}`
    }
    if (!isSomeUnknown && !isSomeFailed && fileCount > 0) {
      return `${successMessage} ${fileCount} file${fileCount > 1 ? 's' : ''} selected. Total size: ${totalMB}`
    }
    return `Select files to upload. ${fileCount} file${fileCount > 1 ? 's' : ''} selected. Total size: ${totalMB}`
  }

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ])

  useEffect(() => () => {
    values[name].forEach((file) => URL.revokeObjectURL(file.preview))
  }, [values[name]])

  return (
    <div className={className}>
      <Field name={name}>
        {
          () => (
            <>
              <div
                id="fileBox"
                data-testid="fileBox"
                className={clsx(
                  isSomeFailed || errorCount > 0 ? 'disable-border' : '',
                  'dropzone'
                )}
                {...getRootProps({ style })}
              >
                <input
                  name={name}
                  {...getInputProps()}
                />
                {isSomeUnknown
                  && (
                    <div className="text-center">
                    <Spinner
                      data-testid="fileBox-icon"
                      className="text-center"
                      color="#002346"
                      size="5rem"
                    />
                    <p data-testid="fileBox-message" className="mt-2 text-center">
                      Upload and scanning in progress, this may take a minute to process.
                      </p>
                    </div>
                  )}
                {!isSomeUnknown && isSomeFailed
                  && (
                    <div className="text-center">
                      <FontAwesomeIcon
                      data-testid="fileBox-icon"
                        id="failed-moderation"
                        icon={faTimesCircle}
                        className="pointer-events-none text-red-500 fa-5x fade-in"
                        height="1em"
                        width="1em"
                      focusable={false}
                      />
                    <p data-testid="fileBox-message" className="mt-2 text-center">
                      Please remove and upload a new file.
                    </p>
                  </div>
                  )}

                {!isSomeUnknown && !isSomeFailed && fileCount > 0
                  && (
                    <div className="text-center">
                      <FontAwesomeIcon
                        id="main-success-moderation"
                        icon={faCheckCircle}
                        className="pointer-events-none text-green-500 fa-5x fade-in"
                        height="1em"
                        width="1em"
                      focusable={false}
                      data-testid="fileBox-icon"
                      />
                    <p data-testid="fileBox-message" className="mt-2 text-center">
                      {successMessage}
                    </p>
                  </div>
                  )}
                <Button
                  aria-label={fileBoxMessages()}
                  id={name}
                  data-testid="files-button"
                  className="mt-4"
                  type="button"
                  onClick={open}
                >
                  {buttonText}
                </Button>
                <p data-testid="files-count" className="mt-4">{fileCount >= 1 ? `(${fileCount} file${fileCount > 1 ? 's' : ''} selected)` : ''}</p>
                <p data-testid="files-total-size" className="mt-2">Total: {totalMB}</p>
              </div>
              <ErrorMessage component={TextError} name={name} />
              <div className="flex flex-col mt-4">
                {thumbs}
              </div>
            </>
          )
        }
      </Field>
    </div>
  )
}

MultiFile.propTypes = {
  name: PropTypes.string,
  onFileDrop: PropTypes.any,
  disabled: PropTypes.any,
  accept: PropTypes.string,
  className: PropTypes.string,
  setFieldValue: PropTypes.func,
  form: PropTypes.any,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  required: PropTypes.bool,
  buttonText: PropTypes.string,
  onRemove: PropTypes.func,
  successMessage: PropTypes.string,
}

export default MultiFile
