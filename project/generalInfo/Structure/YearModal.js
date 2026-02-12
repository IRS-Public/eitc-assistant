import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react'
import { useFormikContext } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Heading from '../../../components/Heading'
import Button from '../../../components/Button'

function YearModal({ title, handleClose, handleConfirm, lang }) {
  const { isSubmitting } = useFormikContext()
  const handleScape = (e) => {
    if (e.keyCode === 27 && e.key === 'Escape') {
      handleClose()
    }
  }

  return (
    <FocusTrap>
      <div
        className="flex fixed h-screen w-screen top-0 left-0 items-center justify-center z-50 bg-black bg-opacity-50 fade-in"
        onClick={() => handleClose()}
        role="alertdialog"
        onKeyDown={(e) => handleScape(e)}
      >
        <div
          className="p-4 md:p-8 w-3/4 lg:w-2/5 clearfix bg-white"
          data-testid="modal"
          role="dialog"
          aria-modal="true"
          id="modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            aria-label="Attention: Changing year will clear your previously entered data. Do you still wish to continue? Close year modal window"
            className="float-right"
            type="button"
            onClick={() => handleClose()}
          >
            <FontAwesomeIcon
              className="mx-1"
              icon={faTimes}
              size="1x"
            />
          </button>

          <Heading
            level="1"
            className="text-2xl font-bold mb-2"
            data-testid="modalHeader"
          >
            {title}
          </Heading>

          <p className="mb-10 mt-4" data-testid="modalText">
            {lang('generalInfo.p.yearModal1')}
          </p>

          <Button
            type="button"
            data-testid="cancelButton"
            id="cancelButton"
            secondary
            onClick={() => handleClose()}
            disabled={isSubmitting}
            aria-label="Cancel year modal window"
            className="mr-3 mb-3 md:mb-0 sm:w-full lg:w-auto"
          >
            {lang('global.btn.cancel')}
          </Button>

          <Button
            type="button"
            data-testid="confirmButton"
            id="confirmButton"
            onClick={() => handleConfirm()}
            disabled={isSubmitting}
            aria-label="Confirm change year"
            className="mr-3 mb-3 md:mb-0 sm:w-full lg:w-auto"
          >
            {lang('global.btn.confirm')}
          </Button>

        </div>
      </div>
    </FocusTrap>
  )
}

YearModal.propTypes = {
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  lang: PropTypes.func.isRequired
}

export default YearModal
