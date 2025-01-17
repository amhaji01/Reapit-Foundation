import * as React from 'react'
import { ButtonGroup, Button } from '@reapit/elements'
import { History } from 'history'
import { cx } from 'linaria'
import qs from 'query-string'
import { ROUTES } from '@/core/router'
import { travelModeButtonContainer } from './__styles__'

export type HandleChangeTravelModeParams = {
  travelMode: 'DRIVING' | 'WALKING'
  queryParams: qs.ParsedQuery<string>
  history: History
}

export const handleChangeTravelMode = ({ history, travelMode, queryParams }: HandleChangeTravelModeParams) => () => {
  const queryString = qs.stringify({ ...queryParams, travelMode: travelMode })
  history.push(`${ROUTES.APPOINTMENT}?${queryString}`)
}

export type TravelModeProps = {
  queryParams: qs.ParsedQuery<string>
  history: History
}

export const TravelMode: React.FC<TravelModeProps> = ({ queryParams, history }) => {
  return (
    <ButtonGroup className={cx(travelModeButtonContainer, 'is-narrow')}>
      <Button
        type="button"
        variant="secondary"
        className={cx(queryParams.travelMode !== 'WALKING' && 'is-selected is-info')}
        onClick={handleChangeTravelMode({ queryParams, travelMode: 'DRIVING', history })}
      >
        Car
      </Button>
      <Button
        type="button"
        variant="secondary"
        className={cx(queryParams.travelMode === 'WALKING' && 'is-selected is-info')}
        onClick={handleChangeTravelMode({ queryParams, travelMode: 'WALKING', history })}
      >
        Walk
      </Button>
    </ButtonGroup>
  )
}

export default React.memo(TravelMode)
