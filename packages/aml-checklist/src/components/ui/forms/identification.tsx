import React from 'react'
import { ContactModel, IdentityDocumentModel } from '@reapit/foundations-ts-definitions'
import { Button, Input, DatePicker, CameraImageInput, Formik, Form } from '@reapit/elements'
import SelectIdentity from '@/components/ui/inputs/select-identity'
import styles from '@/styles/pages/checklist-detail.scss?mod'

export const IDENTIFICATION_FORM_DEFAULT_VALUES: IdentityDocumentModel = {
  typeId: '',
  details: '',
  expiry: '',
}

export type IdentificationProps = {
  contact: ContactModel | null
  initFormValues: IdentityDocumentModel
  loading: boolean
  disabled?: boolean
  onSaveHandler: (values: any) => void
  onNextHandler: (values: any) => () => void
  onPrevHandler: () => void
}

export const renderFormHandler = ({ contact, loading, onNextHandler, onPrevHandler, disabled = false }) => ({
  values,
}) => {
  const id = contact?.id || ''
  return (
    <>
      {disabled && (
        <p className="mb-4">*Please ensure the Primary ID has been completed before adding a Secondary ID</p>
      )}
      <Form>
        <SelectIdentity id="typeId" name="typeId" labelText="ID Type" />
        <Input id="details" name="details" type="text" placeholder="ID Reference" required labelText="ID Reference" />
        <DatePicker id="expiry" name="expiry" labelText="Expiry Date" required />
        <CameraImageInput
          id="fileUrl"
          name="fileUrl"
          labelText="Upload File"
          allowClear={true}
          inputProps={{ disabled: disabled }}
          required
        />

        <div className="field pb-2">
          <div className={`columns ${styles.reverseColumns}`}>
            <div className="column">
              <div className={`${styles.isFullHeight} flex items-center`}>
                <span>RPS Ref:</span>
                <span className="ml-1">{id}</span>
              </div>
            </div>
            <div className={`column ${styles.btnContainer}`}>
              <Button className="mr-2" variant="primary" type="submit" loading={loading} disabled={disabled}>
                Save
              </Button>
              <Button className="mr-2" variant="primary" type="button" onClick={onPrevHandler} disabled={loading}>
                Previous
              </Button>
              <Button variant="primary" type="button" onClick={onNextHandler(values)} disabled={loading || disabled}>
                Next
              </Button>
            </div>
          </div>
        </div>
        <p className="is-size-6">* Indicates fields that are required in order to ‘Complete’ this section.</p>
      </Form>
    </>
  )
}

export const onSubmitHandler = (onSaveHandler: (formValues: IdentityDocumentModel) => void) => (
  formValues: IdentityDocumentModel,
) => onSaveHandler(formValues)

export const Identification: React.FC<IdentificationProps> = ({
  loading,
  contact,
  disabled,
  initFormValues,
  onSaveHandler,
  onNextHandler,
  onPrevHandler,
}) => (
  <Formik initialValues={initFormValues} onSubmit={onSubmitHandler(onSaveHandler)}>
    {renderFormHandler({ contact, loading, onNextHandler, onPrevHandler, disabled })}
  </Formik>
)

export default Identification