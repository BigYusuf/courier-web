export const data = [
  {
    question: 'Type Of Event',
    options: [
      'House Fire',
      'Flood',
      'WildFire',
      'Tornado Or Hurricane',
      'Rain or Snow Storm',
      'Earthquake',
      'Social Emergency',
    ],
    type: 'selectInput',
    category: 'damage',
  },
  {
    question: 'Damage Classification?',
    options: [
      'The local Authority has confirmed that the home is located in a disaster area',
      'No Damage',
      'Minor Damage',
      'Major Damage',
      'Destroyed',
      "Don't Know",
    ],
    type: 'select',
    category: 'damage',
  },
  {
    question: 'Is your home privately insured for content coverage?',
    options: ['Yes', 'No', "Don't Know"],
    type: 'select',
    category: 'house',
  },
  {
    question: 'Do you need, Alternative accommodations?',
    options: ['Yes', 'No'],
    type: 'select',
    category: 'support',
  },
  {
    question: 'Do you need, Assistance with meals?',
    options: ['Yes', 'No'],
    type: 'select',
    category: 'support',
  },
  {
    question: 'Do you need, Assistance with clothing and toiletries?',
    options: ['Yes', 'No'],
    type: 'select',
    category: 'support',
  },
  {
    question:
      'Did you drive your own vehicle out of the evacuation, travel by bus, or catch a ride with friends/ family (other)?',
    options: ['Yes', 'No'],
    type: 'select',
    category: 'support',
  },
  {
    question:
      'Do you have your prescription medication? ( if no, please provide the name of your regular pharmacy)',
    options: ['Yes', 'No'],
    type: 'selectInput',
    category: 'support',
  },
  {
    question: 'Do you require personal mobility equipment/devices?',
    options: ['Yes', 'No'],
    type: 'select',
    category: 'support',
  },
  {
    question: 'Do you use a visual aid( glasses) or hearing aid?',
    options: ['Yes', 'No'],
    type: 'select',
    category: 'support',
  },
  {
    question:
      'Does any one in your household need additional support to cope emotionally with disaster impacts?( i.e. support groups/ counselling)',
    options: ['Yes', 'No'],
    type: 'select',
    category: 'house',
  },
  {
    question: 'What service(s) may help the household/individual?',
    options: [
      'Lodging ',
      'Food',
      'Family Reunification',
      'Personal Services',
      'Emotional/ Safety and Wellbeing Support',
      'Clothing',
      'Transportation',
    ],
    type: 'selectInput',
    category: 'support',
  },
  {
    question: 'What service(s) may help the household/individual?',
    options: ['USDC Wallet ID', 'Email Transfer'],
    type: 'selectInput',
    category: 'support',
  },
];
