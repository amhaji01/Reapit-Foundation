export const applicantMock = {
  id: 'MKT200004',
  created: '2020-07-15T08:22:55Z',
  modified: '2020-07-30T15:40:30Z',
  marketingMode: 'renting',
  currency: 'GBP',
  active: true,
  notes: '',
  lastCall: null,
  nextCall: null,
  departmentId: 'G',
  solicitorId: null,
  type: [],
  style: [],
  situation: [],
  parking: [],
  age: [],
  locality: [],
  bedroomsMin: 0,
  bedroomsMax: 0,
  receptionsMin: 0,
  receptionsMax: 0,
  bathroomsMin: 0,
  bathroomsMax: 0,
  locationType: 'none',
  locationOptions: [],
  buying: null,
  renting: {
    moveDate: '0001-01-01T00:00:00',
    term: '',
    rentFrom: 0,
    rentTo: 43333329,
    rentFrequency: 'monthly',
    furnishing: [],
  },
  externalArea: null,
  internalArea: null,
  source: null,
  officeIds: ['MKT'],
  negotiatorIds: ['ADV'],
  related: [
    {
      id: 'MKT20000010',
      name: 'Ms Lucy Elwood',
      type: 'contact',
      homePhone: '5353553535',
      workPhone: null,
      mobilePhone: '078761235679',
      email: 'lucy@elwood.com',
      primaryAddress: {
        buildingName: 'Flat 1',
        buildingNumber: '12',
        line1: 'Ash Tree Avenue',
        line2: 'South Brompton',
        line3: 'London',
        line4: '',
        postcode: 'SW10 9PA',
        countryId: 'GB',
      },
    },
  ],
  metadata: {},
  _eTag: '"4993CDD4CC12DE435A2E75318E338052"',
  _links: {
    self: {
      href: '/applicants/MKT200004',
    },
    documents: {
      href: '/documents/?associatedType=applicant&associatedId=MKT200004',
    },
    offers: {
      href: '/offers/?applicantId=MKT200004',
    },
    appointments: {
      href: '/appointments/?attendeeType=applicant&attendeeId=MKT200004',
    },
    department: {
      href: '/departments/G',
    },
    offices: {
      href: '/offices/?id=MKT',
    },
    negotiators: {
      href: '/negotiators/?id=ADV',
    },
    relationships: {
      href: '/applicants/MKT200004/relationships',
    },
  },
  _embedded: null,
}
