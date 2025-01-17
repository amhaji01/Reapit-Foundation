import * as React from 'react'
import { shallow } from 'enzyme'
import DeveloperHitsPerDay, { DeveloperHitsPerDayProps } from '../hits-per-day-chart'
import { httpTrafficPerDayStub } from '@/sagas/__stubs__/app-http-traffic-event'
import { H5 } from '@reapit/elements'
import { Line } from 'react-chartjs-2'

const props: DeveloperHitsPerDayProps = {
  stats: httpTrafficPerDayStub.requestsByDate || [],
  loading: false,
}

describe('DeveloperHitsPerDay', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DeveloperHitsPerDay {...props} />)).toMatchSnapshot()
  })
  it('should match a snapshot when loading', () => {
    expect(shallow(<DeveloperHitsPerDay stats={props.stats} loading={true} />)).toMatchSnapshot()
  })
  it('renders Child component', () => {
    const wrapper = shallow(<DeveloperHitsPerDay {...props} />)
    expect(wrapper.containsMatchingElement(<H5>Hits Per Day</H5>)).toEqual(true)
    expect(wrapper.find(Line)).toHaveLength(1)
  })
})
