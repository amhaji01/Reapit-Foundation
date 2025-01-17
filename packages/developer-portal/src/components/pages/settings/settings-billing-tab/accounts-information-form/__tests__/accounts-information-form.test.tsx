import React from 'react'
import { shallow } from 'enzyme'
import AccountsInformationForm, {
  onSubmit,
  AccountsInformationFormValues,
  generateInitialValues,
  defaultInitialValues,
  getInitHasReapitAccountsRef,
} from '../accounts-information-form'
import { updateDeveloperData } from '@/actions/settings'
import appState from '@/reducers/__stubs__/app-state'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'

const developerInfo = appState.settings.developerInfomation

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('getInitHasReapitAccountsRef', () => {
  test('developer status is incomplete', () => {
    expect(getInitHasReapitAccountsRef({ status: 'incomplete' })).toBe('')
  })
  test('has reapitReference', () => {
    expect(getInitHasReapitAccountsRef({ reapitReference: 'ref' })).toBe('yes')
  })
  test('developer status is incomplete', () => {
    expect(getInitHasReapitAccountsRef({})).toBe('no')
  })
})

describe('onSubmit', () => {
  it('onSubmit should run correctly', () => {
    const dispatch = jest.fn()
    const values: AccountsInformationFormValues = {
      hasDirectDebit: 'yes',
      hasReapitAccountsRef: 'yes',
      status: 'pending',
      billingEmail: 'a@gmail.com',
      reapitReference: 'aaa111',
      billingTelephone: '11111111',
      billingKeyContact: 'name',
    }
    const expectedData = {
      status: 'pending',
      reapitReference: 'aaa111',
      billingTelephone: '11111111',
      billingKeyContact: 'name',
      billingEmail: 'a@gmail.com',
    }
    onSubmit({ dispatch })(values)
    expect(dispatch).toHaveBeenCalledWith(updateDeveloperData(expectedData))
  })

  it('onSubmit should run correctly when hasReapitAccountsRef is no & status=incomplete', () => {
    const dispatch = jest.fn()
    const values: AccountsInformationFormValues = {
      hasDirectDebit: 'yes',
      hasReapitAccountsRef: 'no',
      status: 'incomplete',
      billingEmail: 'a@gmail.com',
      reapitReference: 'aaa111',
      billingTelephone: '11111111',
      billingKeyContact: 'name',
    }
    const expectedData = {
      status: 'pending',
      reapitReference: '',
      billingTelephone: '11111111',
      billingKeyContact: 'name',
      billingEmail: 'a@gmail.com',
    }
    onSubmit({ dispatch })(values)
    expect(dispatch).toHaveBeenCalledWith(updateDeveloperData(expectedData))
  })
})

describe('generateInitialValues', () => {
  it('should run correctly', () => {
    const result = generateInitialValues({ defaultInitialValues, developerInfo })
    const {
      billingEmail,
      billingTelephone,
      billingKeyContact,
      reapitReference,
      status,
    } = developerInfo as DeveloperModel
    const expectedResult = {
      billingEmail,
      billingTelephone,
      billingKeyContact,
      reapitReference,
      status,
      hasReapitAccountsRef: '',
      hasDirectDebit: 'no',
    }
    expect(result).toEqual(expectedResult)
  })
  it('should run correctly when developerInfo is null', () => {
    const result = generateInitialValues({ defaultInitialValues, developerInfo: null })
    expect(result).toEqual(defaultInitialValues)
  })
})

describe('AccountsInformationForm', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<AccountsInformationForm />)
    expect(wrapper).toMatchSnapshot()
  })
})
