import * as React from 'react'
import { Section } from '@reapit/elements'
import { SummarySection, AdditionalImagesSection, PermissionsSection, DescriptionSection } from '../common/ui-sections'
import { AppDetailData } from '@/reducers/developer'

export type AppContentProps = {
  appDetailData: AppDetailData
}

const AppContent: React.FC<AppContentProps> = ({ appDetailData }) => {
  const { summary = '', description = '', scopes = [], media = [] } = appDetailData || {}
  return (
    <Section isFlex isFlexColumn hasPadding={false} hasMargin={false}>
      <SummarySection summary={summary} />
      <AdditionalImagesSection images={media} splitIndex={1} numberImages={2} />
      <DescriptionSection description={description} />
      <AdditionalImagesSection images={media} splitIndex={3} numberImages={2} />
      <PermissionsSection permissions={scopes} />
    </Section>
  )
}

export default AppContent